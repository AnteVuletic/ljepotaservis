using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class FilterRepository : ARepository, IFilterRepository
    {
        public FilterRepository(LjepotaServisContext dbLjepotaServisContext) : base(dbLjepotaServisContext)
        {
        }

        public async Task<ICollection<StoreDto>> GetFilteredStores(SearchFilterDto searchFilters)
        {
            bool FilterTypeOrNameOrDate(Store store) =>
                store.Type == searchFilters.StoreType ||
                store.Name.ToLower().Contains(searchFilters.Name.ToLower());

            var stores = _dbLjepotaServisContext.Stores.Where(FilterTypeOrNameOrDate).ToList();

            var allStoreReservationsGroupedByStoreId = await _dbLjepotaServisContext
                .ReservationServices
                .Where(reservationService => stores.Any(store => store.Id == reservationService.Service.StoreId))
                .Join(_dbLjepotaServisContext.Reservations, reservationService => reservationService.ReservationId,
                    reservation => reservation.Id,
                    (service, reservation) => new { service, reservation })
                .GroupBy(joined => joined.service.Service.StoreId, 
                    joined => joined.reservation, 
                    (storeId, reservation) => new { storeId, reservation })
                .ToListAsync();

            var storeListDto = stores.Select(store =>
            {
                var storeReservations = allStoreReservationsGroupedByStoreId.FirstOrDefault(grouped => grouped.storeId == store.Id);
                var rating = storeReservations?.reservation.Sum(storeRes => storeRes.Rating) / storeReservations?.reservation.Count() ?? 0;
                return store.ProjectStoreToStoreDto(rating);
            }).ToList();
            return storeListDto;
        }

    }
}
