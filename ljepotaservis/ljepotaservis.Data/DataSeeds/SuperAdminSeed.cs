using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Entities.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace ljepotaservis.Data.DataSeeds
{
    public class SuperAdminSeed
    {
        public static async void Initialize(IServiceScopeFactory scopeFactory)
        {
            var scope = scopeFactory.CreateScope();
            var context = scope.ServiceProvider.GetService<LjepotaServisContext>();
            var hasSuperAdmin = context.Users.Any(usr => usr.UserName == "Admin");
            if (hasSuperAdmin) return;

            var user = new User
            {
                Email = "admin@ljepotaservis.hr",
                NormalizedEmail = "ADMIN@LJEPOTASERVIS.HR",
                EmailConfirmed = true,
                UserName = "Admin"
            };

            var userManager = scope.ServiceProvider.GetService<UserManager<User>>();
            await userManager.CreateAsync(user, "SuperAdmin$2u");

            await AssignRoles(userManager, user.Email, "SuperAdmin");

            await context.SaveChangesAsync();
        }

        public static async Task<IdentityResult> AssignRoles(UserManager<User> userManager, string email, string role)
        {
            var user = await userManager.FindByEmailAsync(email);
            var result = await userManager.AddToRoleAsync(user, role);
            await userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, role));

            return result;
        }

    }
}
