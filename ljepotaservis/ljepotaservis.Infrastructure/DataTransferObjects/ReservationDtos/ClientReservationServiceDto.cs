using System.Collections.Generic;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos
{
    public class ClientReservationServiceDto
    {
        public UserDto Client { get; set; }
        public ICollection<ReservationServiceDto> ReservationServiceDtos { get; set; }
    }
}
