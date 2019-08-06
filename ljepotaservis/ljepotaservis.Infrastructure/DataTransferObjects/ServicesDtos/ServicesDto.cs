using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos
{
    public class ServicesDto
    {
        public ServicesDto()
        {
            
        }

        public ServicesDto(JObject servicesJObject)
        {
            var services = servicesJObject["services"].Select(service => new ServiceDto(service)).ToList();
            Services = services;
        }
        public ICollection<ServiceDto> Services { get; set; }
    }
}
