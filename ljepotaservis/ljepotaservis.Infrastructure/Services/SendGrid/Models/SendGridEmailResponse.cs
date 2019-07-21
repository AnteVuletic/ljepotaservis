using System;
using System.Collections.Generic;
using System.Text;

namespace ljepotaservis.Infrastructure.Services.SendGrid.Models
{
    public class SendGridEmailResponse
    {
        public bool IsSuccessful => !(Errors?.Count > 0);
        public List<string> Errors { get; set; }
    }
}
