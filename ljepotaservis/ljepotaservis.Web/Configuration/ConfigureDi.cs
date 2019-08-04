using ljepotaservis.Domain.Repositories.Implementations;
using ljepotaservis.Domain.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace ljepotaservis.Web.Configuration
{
    public static class ConfigureDi
    {
        public static IServiceCollection ConfigureDependencyInjection(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IStoreRepository, StoreRepository>();
            services.AddScoped<IReservationRepository, ReservationRepository>();
            services.AddScoped<IFilterRepository, FilterRepository>();

            return services;
        }
    }
}
