using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Infrastructure.Services.SendGrid.Models;

namespace ljepotaservis.Infrastructure.Services.SendGrid
{
    public interface IEmailTemplateSender
    {
        Task<SendGridEmailResponse> SendEmailAsync(SendGridEmailDetails details, string title, string content, string footer,string tokenUrl);
    }
}
