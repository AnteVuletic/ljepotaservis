using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class StoreRepository : ARepository, IStoreRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public StoreRepository(
            LjepotaServisContext dbLjepotaServisContext,
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager) 
            : base(dbLjepotaServisContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<StoreDto> Create(Store store)
        { 
            var storeOrDefault = _dbLjepotaServisContext.Stores.FirstOrDefault(str => str.Name == store.Name);
            if (storeOrDefault != null) throw new Exception("Store with name already exists");

            var newStore = new Store
            {
                Address = store.Address,
                Name = store.Name,
                ClosingDateTime = store.ClosingDateTime,
                OpenDateTime = store.OpenDateTime,
                ImageName = store.ImageName,
                Neighborhood = store.Neighborhood,
                Type = store.Type
            };

            await _dbLjepotaServisContext.Stores.AddAsync(newStore);
            await _dbLjepotaServisContext.SaveChangesAsync();

            return newStore.ProjectStoreToStoreDto(0);
        }

        public async Task<Store> GetStoreById(int id)
        {
            return await _dbLjepotaServisContext.Stores.FindAsync(id);
        }

        public async Task AddEditServicesToStore(Store store, ICollection<Service> services)
        {
            var dbStore = await _dbLjepotaServisContext.Stores.FindAsync(store.Id);
            var dbServices = _dbLjepotaServisContext.Services.Where(service => service.StoreId == dbStore.Id);
            var newServices = services.Where(service => service.Id == 0).ToList();
            services = services.Except(newServices).ToList();

            foreach (var newService in newServices)
            {
                var dbNewService = new Service
                {
                    Store = dbStore,
                    StoreId = dbStore.Id,
                    DurationTicks = newService.Duration.Ticks,
                    Name = newService.Name,
                    Price = newService.Price
                };

                await _dbLjepotaServisContext.AddAsync(dbNewService);
            }
            foreach (var dbService in dbServices)
            {
                var isEdit = services.All(srv => srv.Id != dbService.Id) && services.Count != 0;
                if (!isEdit)
                {
                    _dbLjepotaServisContext.Services.Remove(dbService);
                    continue;
                }

                var service = services.Single(srv => srv.Id == dbService.Id);
                dbService.Name = service.Name;
                dbService.DurationTicks = service.Duration.Ticks;
                dbService.Price = service.Price;
            }
            await _dbLjepotaServisContext.SaveChangesAsync();
        }

        public async Task CreateStoreAndOwner(Store store, UserDto owner)
        {
            var ownerRole = await _roleManager.Roles.SingleAsync(role => role.Name == "Owner");

            var userOwner = owner.ProjectUserDtoToUser(true);

            await _userManager.CreateAsync(userOwner, owner.Password);
            var result = await _userManager.AddToRoleAsync(userOwner, ownerRole.Name);
            if (!result.Succeeded)
                throw new Exception("Unable to create user");

            await _userManager.AddClaimAsync(userOwner, new Claim(ClaimTypes.Role, ownerRole.Name));
            var storeCreated = await Create(store);

            await _userManager.AddClaimAsync(userOwner, new Claim("Store", storeCreated.Id.ToString()));
        }

        public async Task<ICollection<Service>> GetStoreServices(int storeId)
        {
            var store = await _dbLjepotaServisContext.Stores.FindAsync(storeId);
            if (store == null) throw new Exception("Store not exists");

            return await _dbLjepotaServisContext.Services.Where(service => service.StoreId == storeId).ToListAsync();
        }

        public async Task<StoreWorkingHoursDto> GetStoreWorkingHours(int storeId)
        {
            var store = await _dbLjepotaServisContext.Stores.FindAsync(storeId);
            var storeWorkingHoursDto = new StoreWorkingHoursDto
            {
                CloseTime = store.ClosingDateTime,
                OpenTime = store.OpenDateTime
            };

            return storeWorkingHoursDto;
        }

        public async Task<StoreDetailDto> GetAllStoreDetailsById(int storeId)
        {
            var store = await _dbLjepotaServisContext.Stores.FindAsync(storeId);
            if(store == null) throw new Exception("No store with id");

            var storeServices = _dbLjepotaServisContext.Services.Where(service => service.StoreId == storeId);
            var storeServicesDtos = storeServices.Select(service => service.ProjectServiceToServiceDto()).ToList();
            var usersWithStoreClaims =
                await _userManager.GetUsersForClaimAsync(new Claim("Store", store.Id.ToString()));
            var owner = await _userManager.GetUsersForClaimAsync(new Claim(ClaimTypes.Role, RoleHelper.Owner));
            var employees = usersWithStoreClaims.Except(owner).ToList();

            var userEmployeeJoinedReservation = _dbLjepotaServisContext
                .UserStores.Where(userStore => employees.Any(employee => employee.Id == userStore.UserId) &&
                                               userStore.StartOfShift.HasValue)
                .GroupJoin(_dbLjepotaServisContext.Reservations,
                    userStore => userStore.Id,
                    reservation => reservation.UserStoreEmployeeId,
                    (userStore, reservation) => new {userStore, reservation}).ToList();

            var employeeDtos = userEmployeeJoinedReservation.Select(userEmpRes => new EmployeeDto
            {
                Id = userEmpRes.userStore.UserId,
                EndOfShift = userEmpRes.userStore.EndOfShift.GetValueOrDefault(DateTime.Now).AddHours(2),
                StartOfShift = userEmpRes.userStore.StartOfShift.GetValueOrDefault(DateTime.Now).AddHours(2),
                Reservations = userEmpRes.reservation.ToList(),
                StartEndShift = $"{userEmpRes.userStore.StartOfShift.GetValueOrDefault(DateTime.Now).AddHours(2).FormatOpenClose()} - " +
                                $"{userEmpRes.userStore.EndOfShift.GetValueOrDefault(DateTime.Now).AddHours(2).FormatOpenClose()}",
                Rating = (!userEmpRes.reservation.Any()
                    ? 0
                    : (userEmpRes.reservation.Sum(res => res.Rating) / userEmpRes.reservation.Count())).GetValueOrDefault(0)
            }).ToList();

            foreach (var employeeDto in employeeDtos)
            {
                var employee = employees.Single(emp => emp.Id == employeeDto.Id);
                employeeDto.Email = employee.Email;
                employeeDto.FirstName = employee.Firstname;
                employeeDto.LastName = employee.Lastname;
                employeeDto.ImageName = employee.ImageName;
            }

            int? rating;
            rating = employeeDtos.Sum(emp =>
            {
                return emp.Reservations.Count == 0 ? 0 : ( emp.Reservations.Sum(res => res.Rating) / emp.Reservations.Count);
            });

            var storeDetail = store.ProjectStoreToStoreDetailDto(rating.GetValueOrDefault(0), employeeDtos, storeServicesDtos );

            return storeDetail;
        }

        public async Task UpdateStoreDetails(int storeId, Store store)
        {
            var storeDb = await _dbLjepotaServisContext.Stores.FindAsync(storeId);

            storeDb.Address = store.Address;
            storeDb.ClosingDateTime = store.ClosingDateTime;
            storeDb.OpenDateTime = store.OpenDateTime;
            storeDb.Name = store.Name;
            await _dbLjepotaServisContext.SaveChangesAsync();
        }
    }
}
