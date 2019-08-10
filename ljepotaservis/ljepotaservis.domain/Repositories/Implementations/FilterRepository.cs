using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Data.Enums;
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
            searchFilters.Name = searchFilters.Name ?? "";
            searchFilters.Neighborhood = searchFilters.Neighborhood ?? "";

            Func<Store, bool> filterStoreByTypeExpression = store => store.Type == searchFilters.StoreType;
            Func<Store, bool> filterStoreByNameExpression = store => store.Name.ToLower().Contains(searchFilters.Name.ToLower());
            Func<Store, bool> filterStoreByNeighborhood = store => store.Neighborhood.ToLower().Contains(searchFilters.Neighborhood.ToLower());

            Expression<Func<Store, bool>> filtersCombinedExpression;
            if (searchFilters.StoreType == StoreType.All)
                filtersCombinedExpression = store => filterStoreByNameExpression(store) && filterStoreByNeighborhood(store);
            else
                filtersCombinedExpression = store => filterStoreByNameExpression(store) && filterStoreByNeighborhood(store) && filterStoreByTypeExpression(store);

            var stores = _dbLjepotaServisContext.Stores.Where(filtersCombinedExpression).ToList();

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

        public ICollection<string> GetDistinctStoreNeighborhoods()
        {
            var storeNeighborhoods = _dbLjepotaServisContext.Stores.Distinct().Select(store => store.Neighborhood).ToList();
            return storeNeighborhoods;
        }
    }
}
