using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        void Create(UserDto userDto, ReservationServiceDto reservationServiceDto);
        ICollection<ReservationServiceDto> GetReservationsByEmployee(UserEmployeeDto userEmployee);
        ICollection<ReservationServiceDto> GetReservationsByStore(Store store);
        ICollection<ReservationServiceDto> GetReservationsByUser(UserDto user);
    }
}
