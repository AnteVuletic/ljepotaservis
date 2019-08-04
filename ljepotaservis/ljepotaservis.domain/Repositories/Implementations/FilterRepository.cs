using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class FilterRepository : ARepository, IFilterRepository
    {
        public FilterRepository(LjepotaServisContext dbLjepotaServisContext) : base(dbLjepotaServisContext)
        {
        }

        public async Task<ICollection<Store>> GetFilteredStores(SearchFilterDto searchFilters)
        {
            var stores = _dbLjepotaServisContext.Stores.AsQueryable();
            stores = StoresFilteredByName(stores, searchFilters);
            return stores.ToList();
        }

        private IQueryable<Store> StoresFilteredByName(IQueryable<Store> stores, SearchFilterDto searchFilter)
        {
            return searchFilter.StoreName == ""
                ? stores
                : stores.Where(store => store.Name.ToLower().Contains(searchFilter.StoreName.ToLower()));
        }
    }
}
