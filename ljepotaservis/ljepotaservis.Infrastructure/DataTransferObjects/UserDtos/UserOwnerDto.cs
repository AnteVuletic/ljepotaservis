using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Infrastructure.DataTransferObjects.UserDtos
{
    public class UserOwnerDto
    {
        public UserDto UserDto { get; set; }
        public Business Business { get; set; }
        public ICollection<Store> Stores { get; set; }
    }
}
