﻿using System;
using System.Collections.Generic;

namespace ljepotaservis.Data.Entities.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public TimeSpan Duration { get; set; }
        public int StoreId { get; set; }
        public Store Store { get; set; }
        public ICollection<ReservationService> ReservationServices { get; set; }
    }
}
