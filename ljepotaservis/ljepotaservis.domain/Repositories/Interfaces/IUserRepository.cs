using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task RegisterUser(UserDto user);
        Task<string> LoginUser(UserDto user);
        Task<bool> ConfirmEmail(string userId, string emailToken);
        Task AddEditEmployeesToStore(Store store, ICollection<UserDto> employees);
        ICollection<UserDto> GetEmployeesByStore(Store store);
    }
}
