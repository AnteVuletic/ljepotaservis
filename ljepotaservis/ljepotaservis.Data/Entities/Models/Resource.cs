using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Enums;

namespace ljepotaservis.Data.Entities.Models
{
    public class Resource
    {
        public Guid Id { get; set; }
        public string Path { get; set; }
        public ResourceType ResourceType { get; set; }
        public string OwnerId { get; set; }
    }
}
