using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using Microsoft.AspNetCore.WebUtilities;

namespace ljepotaservis.Infrastructure.EmailTemplates
{
    public static class EmailTemplateResolver
    {
        public static async Task<string> Register(User user, string emailToken)
        {
            var emailTokenBytesEncoded = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(emailToken));
            var userIdEncoded = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(user.Id));
            var url =$"https://ljepotaservisweb.azurewebsites.net/authentication/emailconfirmation/{userIdEncoded}?{emailTokenBytesEncoded}";

            var templateText = default(string);
            var executingAssembly = Assembly.GetExecutingAssembly();
            var resourceName = "ljepotaservis.Infrastructure.EmailTemplates.Register.html";
            using (
                var stream = new StreamReader(executingAssembly.GetManifestResourceStream(resourceName), Encoding.UTF8))
            {
                templateText = await stream.ReadToEndAsync();
            }

            templateText = templateText.Replace("--Title--", $"Poštovani {user.Firstname} {user.Lastname}, potvrdite registraciju")
                .Replace("--Content--", "Pritiskom na donji botun će te potvrditi vašu registraciju na Šinjorinu")
                .Replace("--Footer--", "Vaša Šinjorina")
                .Replace("--TokenUrl--", url);
            return templateText;
        }
    }
}
