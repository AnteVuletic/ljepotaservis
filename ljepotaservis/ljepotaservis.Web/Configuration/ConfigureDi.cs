using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Domain.Repositories.Implementations;
using ljepotaservis.Domain.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ljepotaservis.Web.Configuration
{
    public static class ConfigureDi
    {
        public static IServiceCollection ConfigureDependencyInjection(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IStoreRepository, StoreRepository>();
            return services;
        }
    }
}
