using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IFilterRepository
    {
        Task<ICollection<Store>> GetFilteredStores(SearchFilterDto searchFilters);
    }
}
