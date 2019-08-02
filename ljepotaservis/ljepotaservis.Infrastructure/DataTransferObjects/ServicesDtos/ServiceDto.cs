using System;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public TimeSpan Duration { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static ServiceDto ProjectServiceToServiceDto(this Service service)
        {
            return new ServiceDto
            {
                Id = service.Id,
                Name = service.Name,
                Price = service.Price,
                Duration = service.Duration
            };
        }

        public static Service ProjectServiceDtoToService(this ServiceDto serviceDto)
        {
            return new Service
            {
                Id = serviceDto.Id,
                Name = serviceDto.Name,
                Price = serviceDto.Price,
                Duration = serviceDto.Duration,
            };
        }
    }
}
