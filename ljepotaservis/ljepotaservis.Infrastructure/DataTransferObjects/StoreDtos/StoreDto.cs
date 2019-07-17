using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class StoreDto
    {
        public Store Store { get; set; }
        public Resource Profile { get; set; }
        public ICollection<UserEmployeeDto> Employees { get; set; }
    }
}
