using System.Collections.Generic;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class EmployeesDto
    {
        public ICollection<EmployeeDto> Employees { get; set; }
    }
}
