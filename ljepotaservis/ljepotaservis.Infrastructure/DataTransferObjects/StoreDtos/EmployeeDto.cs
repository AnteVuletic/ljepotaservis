using System;
using System.Collections.Generic;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class EmployeeDto
    {
        public string UserId { get; set; }
        public DateTime StartOfShift { get; set; }
        public DateTime EndOfShift { get; set; }
        public ICollection<ReservationServiceDto> Reservations { get; set; }
    }
}
