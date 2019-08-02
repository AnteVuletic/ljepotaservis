using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
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
                var isEdit = services.All(srv => srv.Id != dbService.Id);
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
            var result = _userManager.AddToRoleAsync(userOwner, ownerRole.Name);
            if (!result.Result.Succeeded)
                throw new Exception("Unable to create user");

            await _userManager.AddClaimAsync(userOwner, new Claim(ClaimTypes.Role, ownerRole.Name));
            var storeCreated = await Create(store);

            await _userManager.AddClaimAsync(userOwner, new Claim("Store", storeCreated.Store.Id.ToString()));
        }

        public async Task<ICollection<Service>> GetStoreServices(int storeId)
        {
            var store = await _dbLjepotaServisContext.Stores.FindAsync(storeId);
            if (store == null) throw new Exception("Store not exists");

            return await _dbLjepotaServisContext.Services.Where(service => service.StoreId == storeId).ToListAsync();
        }

        public async Task UpdateStoreDetails(int storeId, Store store, Resource resource = null)
        {
            var storeDb = await _dbLjepotaServisContext.Stores.FindAsync(storeId);

            storeDb.Address = store.Address;
            storeDb.ClosingDateTime = store.ClosingDateTime;
            storeDb.OpenDateTime = store.OpenDateTime;
            storeDb.Name = store.Name;
            await _dbLjepotaServisContext.SaveChangesAsync();
        }

        public Task<StoreDto> UpdateStoreEmployees(Store store, ICollection<UserDto> employees)
        {
            throw new NotImplementedException();
        }
    }
}
