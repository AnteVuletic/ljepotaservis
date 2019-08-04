using System;
using ljepotaservis.Data.Enums;

namespace ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos
{
    public class SearchFilterDto
    {
        public string Name { get; set; }
        public DateTime DateOfReservation { get; set; }
        public StoreType StoreType { get; set; }
    }
}
