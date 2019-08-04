using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ljepotaservis.Data.Entities.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }

        public long DurationTicks { get; set; }
        [NotMapped]
        public TimeSpan Duration
        {
            get => new TimeSpan(DurationTicks);
            set => DurationTicks = value.Ticks;
        }

        public int StoreId { get; set; }
        public Store Store { get; set; }
        public ICollection<ReservationService> ReservationServices { get; set; }

        public override bool Equals(object obj)
        {
            var service = (Service) obj;
            return string.Equals(service.Name, this.Name, StringComparison.CurrentCultureIgnoreCase);
        }
    }
}
