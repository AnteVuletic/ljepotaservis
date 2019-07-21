using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Services.SendGrid;
using WebPWrecover.Services;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IUserRepository
    {
        ICollection<UserEmployeeDto> GetEmployeesByStore(Store store);
        ICollection<UserOwnerDto> GetOwnersByBusiness(Business business);
    }
}
