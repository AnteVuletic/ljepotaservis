using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class ReservationRepository : ARepository, IReservationRepository
    {
        public ReservationRepository(LjepotaServisContext dbLjepotaServisContext) : base(dbLjepotaServisContext)
        {
        }

        public async Task Create(CreateReservationDto createReservationDto)
        {
            var employeeDb = await _dbLjepotaServisContext
                .UserStores
                .Include(userStore => userStore.Store)
                .SingleAsync(userStore => userStore.UserId == createReservationDto.Employee.Id);
            var store = employeeDb.Store;
            var clientStoreOrDefault = await _dbLjepotaServisContext.UserStores.SingleOrDefaultAsync(userStore => userStore.UserId == createReservationDto.Client.Id && userStore.StoreId == store.Id);

            if (clientStoreOrDefault == null)
            {
                var clientDb = await _dbLjepotaServisContext.Users.FindAsync(createReservationDto.Client.Id);

                clientStoreOrDefault = new UserStore
                {
                    UserId = clientDb.Id,
                    User = clientDb,
                    Store = store,
                    StoreId = store.Id
                };

                await _dbLjepotaServisContext.AddAsync(clientStoreOrDefault);
                await _dbLjepotaServisContext.SaveChangesAsync();
            }

            var reservation = new Reservation
            {
                UserStoreEmployee = employeeDb,
                UserStoreEmployeeId = employeeDb.Id,
                UserStore = clientStoreOrDefault,
                UserStoreId = clientStoreOrDefault.Id,
                TimeOfReservation = createReservationDto.DateTimeOfReservation
            };
            await _dbLjepotaServisContext.Reservations.AddAsync(reservation);
            await _dbLjepotaServisContext.SaveChangesAsync();
            
            var reservationServiceList = createReservationDto.Services
                .Select(service =>
                {
                    var serviceDb = _dbLjepotaServisContext.Services.Find(service.Id);
                    return new ReservationService
                    {
                        Reservation = reservation,
                        ReservationId = reservation.Id,
                        Service = serviceDb,
                        ServiceId = serviceDb.Id
                    };
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
            var reservationReservationServices = await _dbLjepotaServisContext
                .Reservations
                .Where(reservation => reservation.UserStoreEmployeeId == userEmployeeStore.Id)
                .ResolveReservationToDto(_dbLjepotaServisContext.ReservationServices)
                .ToListAsync();

            reservationReservationServices = ReservationDurations(reservationReservationServices);
            return reservationReservationServices;
        }

        public async Task<ICollection<ReservationServiceDto>> GetReservationsByStore(Store store)
        {
            var reservationsByStore = await _dbLjepotaServisContext
                .Reservations
                .Where(reservation => reservation.UserStoreEmployee.StoreId == store.Id)
                .ResolveReservationToDto(_dbLjepotaServisContext.ReservationServices)
                .ToListAsync();
            reservationsByStore = ReservationDurations(reservationsByStore);
            return reservationsByStore;
        }

        public async Task<ICollection<ReservationServiceDto>> GetReservationsByUser(UserDto user)
        {
            var userStoreClient = _dbLjepotaServisContext.UserStores.Where(userStore => userStore.UserId == user.Id);
            var reservationsByClient = await _dbLjepotaServisContext
                .Reservations
                .Where(reservation =>
                    userStoreClient.Any(clientStore =>
                        clientStore.Id == reservation.UserStoreId))
                .ResolveReservationToDto(_dbLjepotaServisContext.ReservationServices)
                .ToListAsync();
            reservationsByClient = ReservationDurations(reservationsByClient);
            return reservationsByClient;
        }

        private List<ReservationServiceDto> ReservationDurations(List<ReservationServiceDto> reservationServices)
        {
            foreach (var reservationService in reservationServices)
            {
                var durationOfReservation = new TimeSpan();
                durationOfReservation = reservationService.Services.Aggregate(durationOfReservation,
                    (accumulator, service) => accumulator + service.Duration);
                reservationService.DurationOfReservation = durationOfReservation;
            }

            return reservationServices;
        }
    }
}
