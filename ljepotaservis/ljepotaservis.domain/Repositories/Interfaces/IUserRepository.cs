using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IUserRepository
    {
        void Create(User user);
        void CreateConfirmed(int userId, string confirmToken);
        void Update(User userToUpdate, User userUpdated);
        void LoginUser(User user);
        ICollection<UserEmployeeDto> GetEmployeesByStore(Store store);
        ICollection<UserOwnerDto> GetOwnersByBusiness(Business business);
    }
}
