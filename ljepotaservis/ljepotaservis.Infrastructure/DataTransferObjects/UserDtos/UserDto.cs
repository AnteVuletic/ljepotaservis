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
        public string Token { get; set; }
        public string Role { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static User ProjectUserDtoToUser(this UserDto userDto, bool emailConfirmed = false)
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

        public static UserDto ProjectUserToDtoUser(this User user, string token = "", string role = "")
        {
            return new UserDto
            {
                Id = user.Id,
                Username = user.UserName,
                FirstName = user.Firstname,
                Email = user.Email,
                Token = token,
                Role = role
            };
        }
    }
}
