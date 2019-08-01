using System.Threading.Tasks;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
            var userDto = await _userRepository.LoginUser(user);
            if (userDto == null) return Unauthorized();
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<IActionResult> CheckEmailTaken([FromBody] string email)
        {
            var isEmailTaken = await _userRepository.CheckEmailTaken(email);
            return Ok(isEmailTaken);
        }

        [HttpPost]
        public async Task<IActionResult> CheckUsernameTaken([FromBody] string username)
        {
            var isUserNameTaken = await _userRepository.CheckUsernameTaken(username);
            return Ok(isUserNameTaken);
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