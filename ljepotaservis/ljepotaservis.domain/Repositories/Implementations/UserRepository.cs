using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Abstractions;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Entities.Data;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.EmailTemplates;
using ljepotaservis.Infrastructure.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Domain.Repositories.Implementations
{
    public class UserRepository : ARepository, IUserRepository
    {
        private readonly EmailHelper _emailHelper;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JwtHelper _jwtHelper;

        public UserRepository(
            LjepotaServisContext ljepotaServisContext,
            EmailHelper emailHelper,
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            RoleManager<IdentityRole> roleManager,
            JwtHelper jwtHelper) 
            : base(ljepotaServisContext)
        {
            _emailHelper = emailHelper;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _jwtHelper = jwtHelper;
        }

        public async Task RegisterUser(UserDto user)
        {
            var userRole = _roleManager.Roles.Single(role => role.Name == "User");

            var dbUser = UserDto.ProjectUserDtoToUser(user);
            var result = await _userManager.CreateAsync(dbUser, user.Password);
            await _userManager.AddToRoleAsync(dbUser, userRole.Name);

            if (!result.Succeeded) throw new Exception("Unable to create user");

            var registrationTemplate = await EmailTemplateResolver.Register(dbUser, await _userManager.GenerateEmailConfirmationTokenAsync(dbUser));
            var emailMessage = new MailMessage
            {
                To = { user.Email },
                Body = registrationTemplate,
                Subject = "Confirm registration on Ljepota Servis"
            };
            _emailHelper.SendEmail(emailMessage);
        }

        public async Task<string> LoginUser(UserDto user)
        {
            var dboUser = _userManager.Users.FirstOrDefault(usr =>
                string.Equals(user.Email, usr.Email, StringComparison.CurrentCultureIgnoreCase));

            if (dboUser == null) throw new Exception("Non existent user");
            if (!dboUser.EmailConfirmed) throw new Exception("User non verified email");

            var userSigninResult = await _signInManager.PasswordSignInAsync(dboUser, user.Password, true, false);

            if (!userSigninResult.Succeeded) throw new Exception("Invalid password");

            await _signInManager.SignInAsync(dboUser, true);
            return _jwtHelper.GenerateJwtToken(dboUser);
        }

        public async Task<bool> ConfirmEmail(string userId, string emailToken)
        {
            var dboUser = _userManager.Users.Single(user => user.Id == userId);
            var tokenUrlDecoded = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(emailToken));
            var result = await _userManager.ConfirmEmailAsync(dboUser, tokenUrlDecoded);
            return result.Succeeded;
        }

        public async Task AddEditEmployeesToStore(Store store, ICollection<UserDto> employees)
        {
            foreach (var userDto in employees)
            {
                var employeeRole = await _roleManager.Roles.SingleAsync(role => role.Name == "Employee");
                if (userDto.Id != "")
                {
                    var employeeOrNull = await _userManager.FindByIdAsync(userDto.Id);
                    if (employeeOrNull == null) throw new Exception("User has ID which cannot be found in database");
                    employeeOrNull.Email = userDto.Email;
                    employeeOrNull.Firstname = userDto.FirstName;
                    employeeOrNull.Lastname = userDto.LastName;
                    employeeOrNull.Email = userDto.Email;
                    employeeOrNull.UserName = userDto.Username;

                    await _userManager.UpdateAsync(employeeOrNull);
                }
                else
                {
                    var employee = UserDto.ProjectUserDtoToUser(userDto, true);
                    await _userManager.CreateAsync(employee, userDto.Password);
                    await _userManager.AddToRoleAsync(employee, employeeRole.Name);
                    await _userManager.AddClaimAsync(employee, new Claim("Store", store.Id.ToString()));
                }
            }
        }

        public ICollection<UserDto> GetEmployeesByStore(Store store)
        {
            throw new NotImplementedException();
        }
    }
}
