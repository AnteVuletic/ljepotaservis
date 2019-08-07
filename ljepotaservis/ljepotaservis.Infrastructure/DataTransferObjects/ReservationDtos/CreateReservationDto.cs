using System;
using System.Collections.Generic;
using System.Linq;
using ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos
{
    public class CreateReservationDto
    {
        public CreateReservationDto()
        {}

        public CreateReservationDto(JObject reservationServiceJObject)
        {
            StoreId = int.Parse(reservationServiceJObject["storeId"].ToString());
            Client = reservationServiceJObject["user"].ToObject<UserDto>();
            Employee = reservationServiceJObject["employee"].ToObject<EmployeeDto>();
            DateTimeOfReservation = reservationServiceJObject["date"].ToObject<DateTime>().AddHours(2);
            var services = reservationServiceJObject["services"].Select(serviceToken => new ServiceDto(serviceToken)).ToList();
            Services = services;
        }

        public int StoreId { get; set; }
        public UserDto Client { get; set; }
        public EmployeeDto Employee { get; set; }
        public ICollection<ServiceDto> Services { get; set; }
        public DateTime DateTimeOfReservation { get; set; }
    }
}
