using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Data.Entities.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public bool IsConfirmed { get; set; }
        public DateTime RegistrationDate { get; set; }
        public ICollection<UserStore> UserStores { get; set; }
    }
}
