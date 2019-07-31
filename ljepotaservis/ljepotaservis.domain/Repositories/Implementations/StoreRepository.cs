using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

        public async Task CreateStoreAndOwner(Store store, UserDto owner)
        {
            var ownerRole = await _roleManager.Roles.SingleAsync(role => role.Name == "Owner");

            var userOwner = owner.ProjectUserDtoToUser(true);

            await _userManager.CreateAsync(userOwner, owner.Password);
            var result = _userManager.AddToRoleAsync(userOwner, ownerRole.Name);
            if (!result.Result.Succeeded)
                throw new Exception("Unable to create user");

            var storeCreated = await Create(store);

            await _userManager.AddClaimAsync(userOwner, new Claim("Store", storeCreated.Store.Id.ToString()));
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
