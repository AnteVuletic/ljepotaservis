using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos
{
    public class ReservationServiceDto
    {
        public Reservation Reservation { get; set; }
        public ICollection<Service> Services { get; set; }
        public DateTime EndOfReservation { get; set; }
    }
}
