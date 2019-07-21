using System;
using System.Collections.Generic;
using System.Linq;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Services.SendGrid;
using ljepotaservis.Infrastructure.Services.SendGrid.Models;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class UserRepository : ARepository, IUserRepository
    {
        public UserRepository(LjepotaServisContext ljepotaServisContext) : base(ljepotaServisContext)
        {}

        public ICollection<UserEmployeeDto> GetEmployeesByStore(Store store)
        {
            throw new NotImplementedException();
        }

        public ICollection<UserOwnerDto> GetOwnersByBusiness(Business business)
        {
            throw new NotImplementedException();
        }
    }
}
