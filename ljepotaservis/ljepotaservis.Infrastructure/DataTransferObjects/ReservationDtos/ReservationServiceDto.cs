using System;
using System.Collections.Generic;
using System.Linq;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos
{
    public class ReservationServiceDto
    {
        public Reservation Reservation { get; set; }
        public ICollection<Service> Services { get; set; }
        public TimeSpan DurationOfReservation { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static IQueryable<ReservationServiceDto> ResolveReservationToDto(this IQueryable<Reservation> reservationQueryable, IQueryable<ReservationService> reservationServices)
        {
            return reservationQueryable
                .GroupJoin(reservationServices, reservation => reservation.Id, reservationService => reservationService.ReservationId,
                    (reservation, reservationService) => new ReservationServiceDto
                    {
                        Reservation = reservation,
                        Services = reservationService.Select(rs => rs.Service).ToList()
                    });
        }
    }
}
