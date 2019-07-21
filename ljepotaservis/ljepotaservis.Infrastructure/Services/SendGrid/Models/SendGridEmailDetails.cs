using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Infrastructure.Services.SendGrid.Models
{
    public class SendGridEmailDetails
    {
        public string ToName { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public bool IsHTML { get; set; }
    }
}
