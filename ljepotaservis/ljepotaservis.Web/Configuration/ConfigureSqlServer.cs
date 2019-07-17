using ljepotaservis.Entities.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace ljepotaservis.Web.Configuration
{
    public static class ConfigureSqlServer
    {
        public static void Configure(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LjepotaServisContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("CashierRegister")));
        }
    }
}
