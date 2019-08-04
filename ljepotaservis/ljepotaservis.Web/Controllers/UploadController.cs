using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UploadController : ControllerBase
    {

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> PostImage([FromForm(Name = "file")] IFormFile imageFile)
        {
            var extension = "." + imageFile.FileName.Split('.')[imageFile.FileName.Split('.').Length - 1];
            var newFileName = Guid.NewGuid() + extension;

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\images", newFileName);

            using (var bits = new FileStream(path, FileMode.Create))
            {
                await imageFile.CopyToAsync(bits);
            }

            return Ok(new
            {
                newFileName
            });
        }
    }
}