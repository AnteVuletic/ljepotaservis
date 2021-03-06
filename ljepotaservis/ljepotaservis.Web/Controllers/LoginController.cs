﻿using System.Threading.Tasks;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

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
        public async Task<IActionResult> CheckEmailTaken([FromBody] JObject emailObject)
        {
            var email = emailObject["email"].ToString();
            var isEmailTaken = await _userRepository.CheckEmailTaken(email);
            return Ok(!isEmailTaken);
        }

        [HttpPost]
        public async Task<IActionResult> CheckUsernameTaken([FromBody] JObject usernameObject)
        {
            var username = usernameObject["username"].ToString();
            var isUserNameTaken = await _userRepository.CheckUsernameTaken(username);
            return Ok(!isUserNameTaken);
        }

        [HttpPost]
        public async Task<IActionResult> ConfirmEmail([FromBody] JObject userIdEmailTokenObject)
        {
            var userId = userIdEmailTokenObject["userId"].ToString();
            var emailToken = userIdEmailTokenObject["emailToken"].ToString();
            var hasSucceeded = await _userRepository.ConfirmEmail(userId, emailToken);
            return Ok(hasSucceeded);
        }
    }
}