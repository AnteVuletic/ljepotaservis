using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class StoreRepository : ARepository, IStoreRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public StoreRepository(
            LjepotaServisContext dbLjepotaServisContext,
            UserManager<User> userManager,
            RoleManager<ApplicationRole> roleManager) 
            : base(dbLjepotaServisContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<StoreDto> Create(Store store, Resource resourceProfilePicture = null)
        {
            var storeOrDefault = _dbLjepotaServisContext.Stores.FirstOrDefault(str => str.Name == store.Name);
            if (storeOrDefault != null) throw new Exception("Store with name already exists");

            var newStore = new Store
            {
                Address = store.Address,
                Name = store.Name,
                ClosingDateTime = store.ClosingDateTime,
                OpenDateTime = store.OpenDateTime
            };

            await _dbLjepotaServisContext.Stores.AddAsync(newStore);
            await _dbLjepotaServisContext.SaveChangesAsync();

            return new StoreDto
            {
                Store = newStore
            };
        }

        public async Task<Store> GetStoreById(int id)
        {
            return await _dbLjepotaServisContext.Stores.FindAsync(id);
        }

        public async Task AddEditServicesToStore(StoreDto storeDto)
        {
            foreach (var service in storeDto.Services)
            {
                var serviceOrNull = await _dbLjepotaServisContext
                    .Services
                    .SingleOrDefaultAsync(srv => srv.Name == service.Name && srv.StoreId == storeDto.Store.Id);
                if (serviceOrNull == null)
                {
                    serviceOrNull = new Service
                    {
                        Store = storeDto.Store,
                        StoreId = storeDto.Store.Id,
                        Duration = service.Duration,
                        Name = service.Name,
                        Price = service.Price
                    };
                }
                else
                {
                    serviceOrNull.Duration = service.Duration;
                    serviceOrNull.Name = service.Name;
                    serviceOrNull.Price = service.Price;
                }
                await _dbLjepotaServisContext.Services.AddAsync(serviceOrNull);
                await _dbLjepotaServisContext.SaveChangesAsync();
            }
        }

        public async Task AddEditEmployeesToStore(StoreDto storeDto)
        {
            foreach (var userDto in storeDto.Employees)
            {
                var employeeRole = await _roleManager.Roles.SingleAsync(role => role.Name == "Employee");
                if (userDto.Id != "")
                {
                    var employeeOrNull = await _userManager.FindByIdAsync(userDto.Id);
                    if(employeeOrNull == null) throw new Exception("User has ID which cannot be found in database");
                    employeeOrNull.Email = userDto.Email;
                    employeeOrNull.Firstname = userDto.FirstName;
                    employeeOrNull.Lastname = userDto.LastName;
                    employeeOrNull.Email = userDto.Email;
                    employeeOrNull.UserName = userDto.Username;

                    await _userManager.UpdateAsync(employeeOrNull);
                }
                else
                {
                    var employee = UserDto.ProjectUserDtoToUser(userDto, true);
                    await _userManager.CreateAsync(employee, userDto.Password);
                    await _userManager.AddToRoleAsync(employee, employeeRole.Name);
                    await _userManager.AddClaimAsync(employee, new Claim("Store", storeDto.Store.Id.ToString()));
                }
            }
        }

        public ICollection<StoreDto> GetStoreByReservationDate(ReservationServiceDto reservations)
        {
            throw new NotImplementedException();
        }

        public ICollection<StoreDto> GetStoreByService(Service service)
        {
            throw new NotImplementedException();
        }

        public StoreDto GetStoreByEmployee(UserDto employee)
        {
            throw new NotImplementedException();
        }

        public StoreDto UpdateStoreDetails(Store storeToUpdate, Store store, Resource resource = null)
        {
            throw new NotImplementedException();
        }

        public StoreDto UpdateStoreEmployees(Store store, ICollection<UserDto> employees)
        {
            throw new NotImplementedException();
        }
    }
}
