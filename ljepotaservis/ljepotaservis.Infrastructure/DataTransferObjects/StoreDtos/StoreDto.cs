using System.Collections.Generic;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class StoreDto
    {
        public Store Store { get; set; }
        public Resource Profile { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<UserDto> Employees { get; set; }
    }
}
