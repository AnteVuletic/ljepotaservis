using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IStoreRepository
    {
        Task<StoreDto> Create(Store store);
        Task<Store> GetStoreById(int id);
        Task AddEditServicesToStore(Store store, ICollection<Service> services);
        Task CreateStoreAndOwner(Store store, UserDto owner);
        Task<ICollection<Service>> GetStoreServices(int storeId);
        Task<StoreWorkingHoursDto> GetStoreWorkingHours(int storeId);
        Task UpdateStoreDetails(int storeId, Store store);
    }
}
