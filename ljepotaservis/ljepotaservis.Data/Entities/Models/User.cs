using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using ljepotaservis.Data.Enums;
using Microsoft.AspNetCore.Identity;

namespace ljepotaservis.Data.Entities.Models
{
    public class User : IdentityUser
    {
        public override string Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public override string UserName { get; set; }
        public override string Email { get; set; }
        public override bool EmailConfirmed { get; set; }
        public ICollection<UserStore> UserStores { get; set; }
    }
}
