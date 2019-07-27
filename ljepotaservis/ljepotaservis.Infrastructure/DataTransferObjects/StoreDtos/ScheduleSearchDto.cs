using System;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class ScheduleSearchDto
    {
        public DateTime FreeFrom { get; set; }
        public DateTime FreeTo { get; set; }
    }
}
