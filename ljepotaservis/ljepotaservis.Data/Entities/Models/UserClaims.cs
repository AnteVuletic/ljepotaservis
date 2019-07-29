using Microsoft.AspNetCore.Identity;

namespace ljepotaservis.Data.Entities.Models
{
    public class UserClaims : IdentityUserClaim<string>
    {
        public virtual User User { get; set; }
    }
}
