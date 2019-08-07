using System.Collections.Generic;
using System.Threading.Tasks;
using ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IFilterRepository
    {
        Task<ICollection<StoreDto>> GetFilteredStores(SearchFilterDto searchFilters);
    }
}
