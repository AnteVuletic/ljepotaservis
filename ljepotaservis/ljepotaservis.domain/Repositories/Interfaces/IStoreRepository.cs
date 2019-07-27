using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IStoreRepository
    {
        Task<StoreDto> Create(Store store, Resource resourceProfilePicture = null);
        Task<Store> GetStoreById(int id);
        Task AddEditServicesToStore(StoreDto storeDto);
        Task CreateStoreAndOwner(Store store, UserDto owner);
        Task<ICollection<StoreDto>> GetStoreByReservationDate(ReservationServiceDto reservations);
        Task<ICollection<StoreDto>> GetStoreByService(Service service);
        Task<StoreDto> GetStoreByEmployee(UserDto employee);
        Task<StoreDto> UpdateStoreDetails(Store storeToUpdate, Store store, Resource resource = null);
        Task<StoreDto> UpdateStoreEmployees(Store store, ICollection<UserDto> employees);
    }
}
