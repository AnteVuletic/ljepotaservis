using ljepotaservis.Entities.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ljepotaservis.Web.Configuration
{
    public static class ConfigureContext
    {
        public static IServiceCollection ConfigureSqlServer(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<LjepotaServisContext>(options =>
                {
                    options.UseSqlServer(configuration.GetConnectionString("LjepotaServis"));
                });
            return services;
        }
    }
}
