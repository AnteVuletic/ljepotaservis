using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Data.Entities.Models
{
    public class Store
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public ICollection<UserStore> UserStores { get; set; }
        public ICollection<Service> Services { get; set; }
        public DateTime OpenDateTime { get; set; }
        public DateTime ClosingDateTime { get; set; }
    }
}
