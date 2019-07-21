using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Data.Entities.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int UserStoreId { get; set; }
        public UserStore UserStore { get; set; }
        public int? UserStoreEmployeeId { get; set; }
        public UserStore UserStoreEmployee { get; set; }
        public DateTime TimeOfReservation { get; set; }
        public int? Rating { get; set; }
        public ICollection<ReservationService> ReservationServices { get; set; }
    }
}
