using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace ljepotaservis.Infrastructure.Helpers
{
    public class EmailHelper
    {
        public EmailHelper(IConfiguration configuration)
        {
            _smtpClient = new SmtpClient
            {
                Host = configuration["Smtp:Server"],
                Port = int.Parse(configuration["Smtp:Port"]),
                Credentials = new NetworkCredential(configuration["Smtp:Username"], configuration["Smtp:Password"]),
                EnableSsl = true
            };
        }

        private readonly SmtpClient _smtpClient;

        public void SendEmail(MailMessage message)
        {
            message.From = new MailAddress("ljepotaservis@outlook.com", "Ljepota servis");
            message.IsBodyHtml = true;
            _smtpClient.Send(message);
        }
    }
}
