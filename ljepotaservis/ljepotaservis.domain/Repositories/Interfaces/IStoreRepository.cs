using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IStoreRepository
    {
        StoreDto Create(Store store,ICollection<UserEmployeeDto> employees,UserOwnerDto owner ,Business business, Resource resourceProfilePicture = null);
        ICollection<StoreDto> GetStoresByBusiness(Business business);
        ICollection<StoreDto> GetStoreByReservationDate(ReservationServiceDto reservations);
        ICollection<StoreDto> GetStoreByService(Service service);
        StoreDto GetStoreByEmployee(UserEmployeeDto employee);
        StoreDto UpdateStoreDetails(Store storeToUpdate, Store store, Resource resource = null);
        StoreDto UpdateStoreEmployees(Store store, ICollection<UserEmployeeDto> employees);
    }
}
