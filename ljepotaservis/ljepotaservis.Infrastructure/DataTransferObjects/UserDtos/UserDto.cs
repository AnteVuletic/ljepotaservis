using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Infrastructure.DataTransferObjects.UserDtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public ICollection<string> Claims { get; set; }

        public static User ProjectUserDtoToUser(UserDto userDto, bool emailConfirmed = false)
        {
            var userDb = new User
            {
                Email = userDto.Email,
                Firstname = userDto.FirstName,
                Lastname = userDto.LastName,
                EmailConfirmed = emailConfirmed,
                UserName = userDto.Username
            };

            return userDb;
        }
    }
}
