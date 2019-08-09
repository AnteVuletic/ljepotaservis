using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IReservationRepository
    {
        Task Create(CreateReservationDto createReservationDto);
        Task<ICollection<ReservationServiceDto>> GetCurrentReservationsByEmployee(UserDto userEmployee);
        Task<ICollection<ReservationServiceDto>> GetReservationsByStore(Store store);
        Task<ICollection<ReservationServiceDto>> GetReservationsByUser(UserDto user);
        Task<ICollection<ReservationServiceDto>> GetReservationsForEmployeeByDate(User employeeUser, DateTime date);
        Task SetRatingByReservation(Reservation reservation, int rating);
    }
}
