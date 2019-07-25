using ljepotaservis.Infrastructure.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ljepotaservis.Web.Configuration
{
    public static class ConfigureEmail
    {
        public static IServiceCollection ConfigureSendGrid(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<EmailHelper>();
            services.Configure<EmailHelper>(configuration);
            return services;
        }
    }
}
