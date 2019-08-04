using Microsoft.AspNetCore.Identity;

namespace ljepotaservis.Data.Entities.Models
{
    public class ApplicationRoleClaim : IdentityRoleClaim<string>
    {
        public virtual ApplicationRole Role { get; set; }
    }
}
