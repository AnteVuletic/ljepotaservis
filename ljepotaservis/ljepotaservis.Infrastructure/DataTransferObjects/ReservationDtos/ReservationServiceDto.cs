using System;
using System.Collections.Generic;
using System.Linq;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos
{
    public class ReservationServiceDto
    {
        public Reservation Reservation { get; set; }
        public ICollection<ServiceDto> Services { get; set; }
        public TimeSpan DurationOfReservation { get; set; }
        public UserDto Client { get; set; }
        public Store Store { get; set; }
        public int Price { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static IQueryable<ReservationServiceDto> ResolveReservationToDto(this IQueryable<Reservation> reservationQueryable, IQueryable<ReservationService> reservationServices)
        {
            return reservationQueryable
                .GroupJoin(reservationServices, reservation => reservation.Id, reservationService => reservationService.ReservationId,
                    (reservation, reservationService) => new ReservationServiceDto
                    {
                        Reservation = new Reservation
                        {
                            Id = reservation.Id,
                            EndOfReservation = reservation.EndOfReservation,
                            TimeOfReservation = reservation.TimeOfReservation
                        },
                        Client = new UserDto
                        {
                            FirstName = reservation.UserStore.User.Firstname,
                            LastName = reservation.UserStore.User.Lastname,
                            Email = reservation.UserStore.User.Email
                        },
                        Services = reservationService.Select(rs => rs.Service.ProjectServiceToServiceDto()).ToList(),
                        Store = reservationService.Select(rs => rs.Service.Store).First()
                    });
        }
    }
}
