using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Infrastructure.DataTransferObjects.UserDtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
