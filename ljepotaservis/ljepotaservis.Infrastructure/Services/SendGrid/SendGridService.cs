using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using ljepotaservis.Infrastructure.Services.Models;
using ljepotaservis.Infrastructure.Services.SendGrid;
using ljepotaservis.Infrastructure.Services.SendGrid.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace WebPWrecover.Services
{
    public class SendGridService : IEmailTemplateSender
    {
        public SendGridService(IOptions<AuthorizationSendGirdOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public AuthorizationSendGirdOptions Options { get; }

        public async Task<SendGridEmailResponse> SendEmailAsync(SendGridEmailDetails details, string title, string content, string footer, string tokenUrl)
        {
            var client = new SendGridClient(Options.SendGridKey);

            #region TemplateHandling
            var templateText = default(string);
            var executingAssembly = Assembly.GetExecutingAssembly();
            var resourceName = "ljepotaservis.Infrastructure.Services.SendGrid.EmailTemplates.Register.html";
            using (
                var stream = new StreamReader(executingAssembly.GetManifestResourceStream(resourceName),Encoding.UTF8))
            {
                templateText = await stream.ReadToEndAsync();
            }

            templateText = templateText.Replace("--Title--", title)
                                        .Replace("--Content--", content)
                                        .Replace("--Footer--", footer)
                                        .Replace("--TokenUrl--", tokenUrl);
            #endregion

            details.Content = templateText;

            var message = MailHelper.CreateSingleEmail(
                from: new EmailAddress(Options.FromEmail, Options.From),
                to: new EmailAddress(details.ToEmail, details.ToName),
                subject: details.Subject,
                plainTextContent: null,
                htmlContent: details.Content);

            var response = await client.SendEmailAsync(message);

            if (response.StatusCode == HttpStatusCode.Accepted)
                return new SendGridEmailResponse();

            return new SendGridEmailResponse
            {
                Errors = new List<string>
                {
                    {
                        new string("Error with service")
                    }
                }
            };
        }
    }
}