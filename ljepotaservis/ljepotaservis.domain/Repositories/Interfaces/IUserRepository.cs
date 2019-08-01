using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task RegisterUser(UserDto user);
        Task<UserDto> LoginUser(UserDto user);
        Task<bool> ConfirmEmail(string userId, string emailToken);
        Task AddEditEmployeesToStore(Store store, ICollection<UserDto> employees);
        Task<bool> CheckEmailTaken(string email);
        Task<bool> CheckUsernameTaken(string username);
        Task<ICollection<User>> GetEmployeesByStore(Store store);
    }
}
