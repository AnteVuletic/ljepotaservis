using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Infrastructure.DataTransferObjects.UserDtos
{
    public class UsersDto
    {
        public ICollection<UserDto> Employees { get; set; }
    }
}
