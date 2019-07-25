using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Helpers;
using ljepotaservis.Infrastructure.Services.SendGrid;
using ljepotaservis.Infrastructure.Services.SendGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [AllowAnonymous]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public LoginController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDto user)
        {
            await _userRepository.RegisterUser(user);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDto user)
        {
            var token = await _userRepository.LoginUser(user);
            return Ok(new
            {
                token
            });
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string emailToken)
        {
            var hasSucceeded = await _userRepository.ConfirmEmail(userId, emailToken);
            if(hasSucceeded)
                return Ok();
            return BadRequest();
        }
    }
}