using System;
using ljepotaservis.Data.Enums;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos
{
    public class SearchFilterDto
    {
        public SearchFilterDto(JObject searchFilter)
        {
            Enum.TryParse<StoreType>(searchFilter["filters"]["storeType"].ToString(), out var storeType);
            StoreType = storeType;
            Name = searchFilter["filters"]["name"].ToString();
            var neighborhood = searchFilter["filters"]["neighborhood"].ToString();
            Neighborhood = neighborhood == "Sve" ? "" : neighborhood;
        }
        public string Name { get; set; }
        public string Neighborhood { get; set; }
        public StoreType StoreType { get; set; }
    }
}
