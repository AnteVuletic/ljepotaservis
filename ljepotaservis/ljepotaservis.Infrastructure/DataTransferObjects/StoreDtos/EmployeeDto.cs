using System;
using System.Collections.Generic;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class EmployeeDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime StartOfShift { get; set; }
        public DateTime EndOfShift { get; set; }
        public string ImageName { get; set; }
        public ICollection<ReservationServiceDto> Reservations { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static User ProjectEmployeeDtoToUser(this EmployeeDto employee)
        {
            return new User
            {
                Email = employee.Email,
                Firstname = employee.FirstName,
                Lastname = employee.LastName,
                EmailConfirmed = true,
                UserName = employee.Username,
                ImageName = employee.ImageName
            };
        }

        public static EmployeeDto ProjectUserAndUserStoreToEmployeeDto(this User user, UserStore userStore)
        {
            return new EmployeeDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.Firstname,
                LastName = user.Lastname,
                Username = user.UserName,
                ImageName = user.ImageName,
                StartOfShift = userStore.StartOfShift ?? DateTime.MinValue,
                EndOfShift = userStore.EndOfShift ?? DateTime.MinValue
            };
        }
    }
}
