using System;
using ljepotaservis.Data.Entities.Models;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos
{
    public class ServiceDto
    {
        public ServiceDto()
        {}

        public ServiceDto(JToken serviceJObject)
        {
            Id = serviceJObject["id"] != null ? int.Parse(serviceJObject["id"].ToString()) : 0;
            Price = int.Parse(serviceJObject["price"].ToString());
            Name = serviceJObject["name"].ToString();
            var durationDateTime = serviceJObject["duration"].ToObject<DateTime>();
            durationDateTime = durationDateTime.AddHours(2);
            Duration = TimeSpan.FromMinutes(durationDateTime.Hour * 60 + durationDateTime.Minute);
        }
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
