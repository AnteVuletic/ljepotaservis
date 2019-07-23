using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Helpers;
using ljepotaservis.Infrastructure.Services.SendGrid;
using ljepotaservis.Infrastructure.Services.SendGrid.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IEmailTemplateSender _emailSender;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly JwtHelper _jwtHelper;
        private readonly IStoreRepository _storeRepository;

        public UserController(
            IUserRepository userRepository,
            IEmailTemplateSender emailSender,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<ApplicationRole> roleManager,
            JwtHelper jwtHelper,
            IStoreRepository storeRepository)
        {
            _userRepository = userRepository;
            _emailSender = emailSender;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _jwtHelper = jwtHelper;
            _storeRepository = storeRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserDto user)
        {
            var userRole = _roleManager.Roles.Single(role => role.Name == "User");

            var dbUser = UserDto.ProjectUserToUserDto(user);
            var result = await _userManager.CreateAsync(dbUser, user.Password);
            await _userManager.AddToRoleAsync(dbUser, userRole.Name);

            if (!result.Succeeded) return BadRequest();

            SendGridEmailResponse emailResponse;
            do
            {
                emailResponse = await EmailVerificationHelper.SendVerificationEmail(dbUser, _emailSender, _userManager);
                if (!emailResponse.IsSuccessful)
                    await Task.Delay(5000);

            } while (!emailResponse.IsSuccessful);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserDto user)
        {
            var dboUser = _userManager.Users.FirstOrDefault(usr =>
                string.Equals(user.Email, usr.Email, StringComparison.CurrentCultureIgnoreCase));

            if (dboUser == null) return BadRequest("Non existent user");
            if (!dboUser.EmailConfirmed) return Unauthorized("User non verified email");

            var userSigninResult = await _signInManager.PasswordSignInAsync(dboUser, user.Password, true, false);

            if (!userSigninResult.Succeeded) return Unauthorized("Invalid password");

            await _signInManager.SignInAsync(dboUser, true);

            return Ok(new
            {
                token = _jwtHelper.GenerateJwtToken(dboUser)
            });
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string emailToken)
        {
            var dboUser = _userManager.Users.Single(user => user.Id == userId);
            var tokenUrlDecoded = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(emailToken));
            var result = await _userManager.ConfirmEmailAsync(dboUser, tokenUrlDecoded);
            if (result.Succeeded) return Ok();
            return Unauthorized();
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateStoreAndOwner([FromBody] StoreDto store, UserDto owner)
        {
            var ownerRole = await _roleManager.Roles.SingleAsync(role => role.Name == "Owner");

            var userOwner = UserDto.ProjectUserToUserDto(owner, true);

            await _userManager.CreateAsync(userOwner, owner.Password);
            var result = _userManager.AddToRoleAsync(userOwner, ownerRole.Name);
            if (!result.Result.Succeeded)
                return BadRequest();
            
            var storeCreated = await _storeRepository.Create(store.Store);

            await _userManager.AddClaimAsync(userOwner, new Claim("Store", storeCreated.Store.Id.ToString()));
            return Ok();
        }
    }
}