using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class EmployeesDto
    {
        public EmployeesDto()
        {
            
        }

        public EmployeesDto(JObject employeesJObject)
        {
            var employees = employeesJObject["employees"].Select(employee => employee.ToObject<EmployeeDto>()).ToList();
            Employees = employees;
        }
        public ICollection<EmployeeDto> Employees { get; set; }
    }
}
