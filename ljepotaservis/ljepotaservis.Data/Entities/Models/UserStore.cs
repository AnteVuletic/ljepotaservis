using System;
using System.Collections.Generic;

namespace ljepotaservis.Data.Entities.Models
{
    public class UserStore
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int StoreId { get; set; }
        public Store Store { get; set; }
        public DateTime? StartOfShift { get; set; }
        public DateTime? EndOfShift { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
