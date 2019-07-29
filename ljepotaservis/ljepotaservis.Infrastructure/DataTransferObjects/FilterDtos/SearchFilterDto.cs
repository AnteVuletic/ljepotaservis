using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos
{
    public class SearchFilterDto
    {
        public string StoreName { get; set; }
        public string ServiceName { get; set; }
        public int? ServicePrice { get; set; }
        public DateTime DateOfReservation { get; set; }
    }
}
