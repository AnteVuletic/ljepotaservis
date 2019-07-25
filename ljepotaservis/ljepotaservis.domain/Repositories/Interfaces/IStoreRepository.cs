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
        ICollection<StoreDto> GetStoreByReservationDate(ReservationServiceDto reservations);
        ICollection<StoreDto> GetStoreByService(Service service);
        StoreDto GetStoreByEmployee(UserDto employee);
        StoreDto UpdateStoreDetails(Store storeToUpdate, Store store, Resource resource = null);
        StoreDto UpdateStoreEmployees(Store store, ICollection<UserDto> employees);
    }
}
