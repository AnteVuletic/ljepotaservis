using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task Create(UserDto client, UserDto employee, ReservationServiceDto reservationServiceDto);
        Task<ICollection<ReservationServiceDto>> GetCurrentReservationsByEmployee(UserDto userEmployee);
        Task<ICollection<ReservationServiceDto>> GetReservationsByStore(Store store);
        Task<ICollection<ReservationServiceDto>> GetReservationsByUser(UserDto user);
    }
}
