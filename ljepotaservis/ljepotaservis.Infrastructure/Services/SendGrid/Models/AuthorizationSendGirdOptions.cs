using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Infrastructure.Services.Models
{
    public class AuthorizationSendGirdOptions
    {
        public string SendGridUser { get; set; }
        public string SendGridKey { get; set; }
        public string FromEmail { get; set; }
        public string From { get; set; }
    }
}
