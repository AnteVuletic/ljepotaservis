using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class ReservationRepository : ARepository, IReservationRepository
    {
        public ReservationRepository(LjepotaServisContext dbLjepotaServisContext) : base(dbLjepotaServisContext)
        {
        }

        public async Task Create(UserDto client, UserDto employee, ReservationServiceDto reservationServiceDto)
        {
            var clientDb = await _dbLjepotaServisContext.Users.FindAsync(client.Id);
            var employeeDb = await _dbLjepotaServisContext.UserStores.SingleAsync(userStore => userStore.UserId == employee.Id);

            var userStoreClient = new UserStore
            {
                UserId = clientDb.Id,
                User = clientDb
            };

            var reservation = new Reservation
            {
                UserStoreEmployee = employeeDb,
                UserStoreEmployeeId = employeeDb.Id,
                UserStore = userStoreClient,
                UserStoreId = userStoreClient.Id
            };
            await _dbLjepotaServisContext.Reservations.AddAsync(reservation);
            await _dbLjepotaServisContext.SaveChangesAsync();
            

            var reservationServiceList = reservationServiceDto
                .Services
                .Select(service => new ReservationService
                {
                    Reservation = reservation,
                    ReservationId = reservation.Id,
                    Service = service,
                    ServiceId = service.Id
                }).ToList();

            var totalTimeOfReservation = new TimeSpan();
            totalTimeOfReservation = reservationServiceList.Aggregate(totalTimeOfReservation,
                (accumulator, r) => accumulator + r.Service.Duration);

            reservation.EndOfReservation = reservation.TimeOfReservation.Add(totalTimeOfReservation);

            await _dbLjepotaServisContext.ReservationServices.AddRangeAsync(reservationServiceList);
            await _dbLjepotaServisContext.SaveChangesAsync();
        }

        public async Task<ICollection<ReservationServiceDto>> GetCurrentReservationsByEmployee(UserDto userEmployee)
        {
            var userEmployeeStore = await _dbLjepotaServisContext.UserStores.SingleAsync(userStore => userStore.UserId == userEmployee.Id);
            var reservationReservationServices = _dbLjepotaServisContext
                .Reservations
                .GroupJoin(_dbLjepotaServisContext.ReservationServices, reservation => reservation.Id, reservationService => reservationService.ReservationId,
                    (reservation, reservationService) => new ReservationServiceDto{ Reservation = reservation, Services = reservationService.Select(rs => rs.Service).ToList()})
                .Where(reservationsReservationService => reservationsReservationService.Reservation.UserStoreEmployeeId == userEmployeeStore.Id);
            foreach (var reservationReservationService in reservationReservationServices)
            {
                var durationOfReservation = new TimeSpan();
                durationOfReservation = reservationReservationService.Services.Aggregate(durationOfReservation,
                    (accumulator, service) => accumulator + service.Duration);
                reservationReservationService.DurationOfReservation = durationOfReservation;
            }

            return await reservationReservationServices.ToListAsync();
        }

        public Task<ICollection<ReservationServiceDto>> GetReservationsByStore(Store store)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<ReservationServiceDto>> GetReservationsByUser(UserDto user)
        {
            throw new NotImplementedException();
        }
    }
}
