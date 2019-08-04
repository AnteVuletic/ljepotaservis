using System;
using System.Collections.Generic;
using ljepotaservis.Data.Enums;

namespace ljepotaservis.Data.Entities.Models
{
    public class Store
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public DateTime OpenDateTime { get; set; }
        public DateTime ClosingDateTime { get; set; }
        public string ImageName { get; set; }
        public string Neighborhood { get; set; }
        public StoreType Type { get; set; }
        public ICollection<UserStore> UserStores { get; set; }
        public ICollection<Service> Services { get; set; }
        public ICollection<Portfolio> Portfolios { get; set; }
    }
}
