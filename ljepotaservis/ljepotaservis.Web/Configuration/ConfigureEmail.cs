using ljepotaservis.Infrastructure.Services.Models;
using ljepotaservis.Infrastructure.Services.SendGrid;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebPWrecover.Services;

namespace ljepotaservis.Web.Configuration
{
    public static class ConfigureEmail
    {
        public static IServiceCollection ConfigureSendGrid(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IEmailTemplateSender, SendGridService>();
            services.Configure<AuthorizationSendGirdOptions>(configuration.GetSection("SendGrid"));
            return services;
        }
    }
}
