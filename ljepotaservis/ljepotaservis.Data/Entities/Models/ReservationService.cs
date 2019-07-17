using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Data.Entities.Models
{
    public class ReservationService
    {
        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
    }
}
