using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Infrastructure.Services.SendGrid.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;

namespace ljepotaservis.Infrastructure.Services.SendGrid
{
    public static class EmailVerificationHelper
    {
        public static async Task<SendGridEmailResponse> SendVerificationEmail(User user, IEmailTemplateSender sendGrid, UserManager<User> userManager)
        {
            var emailToken = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var emailTokenBytesEncoded = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(emailToken));
            var url = $"https://localhost:44349/api/User/ConfirmEmail/?userId={user.Id}&emailToken={emailTokenBytesEncoded}";

            var sendGridEmailDetails = new SendGridEmailDetails
            {
                ToEmail = user.Email,
                Subject = "Potvrda registracije na ljepotaservis",
                ToName = $"{user.Firstname} {user.Lastname}",
                Content = "",
                IsHTML = true
            };
            var response = await sendGrid.SendEmailAsync(
                sendGridEmailDetails,
                $"Poštovani {user.Firstname} {user.Lastname}, potvrdite registraciju",
                "Pritiskom na donji botun ce te potvrditi vašu registraciju na ljepotaservis",
                "Vaš ljepotaservis",
                url
            );

            return response;
        }
    }
}
