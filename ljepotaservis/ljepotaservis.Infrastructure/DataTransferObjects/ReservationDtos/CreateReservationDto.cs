using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos
{
    public class CreateReservationDto
    {
        public UserDto Client { get; set; }
        public UserDto Employee { get; set; }
        public ReservationServiceDto ReservationServiceDto { get; set; }
    }
}
