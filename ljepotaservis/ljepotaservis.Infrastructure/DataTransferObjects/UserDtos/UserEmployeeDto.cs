using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Infrastructure.DataTransferObjects.UserDtos
{
    public class UserEmployeeDto
    {
        public UserDto UserDto { get; set; }
        public Store Store { get; set; }
    }
}
