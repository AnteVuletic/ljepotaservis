using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Data.Entities.Models
{
    public class Business
    {
        public string Oib { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<Store> Stores { get; set; }
    }
}
