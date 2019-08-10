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
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
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

            var dbUser = user.ProjectUserDtoToUser();
            var result = await _userManager.CreateAsync(dbUser, user.Password);
            await _userManager.AddToRoleAsync(dbUser, userRole.Name);
            await _userManager.AddClaimAsync(dbUser, new Claim(ClaimTypes.Role, userRole.Name));

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

        public async Task<UserDto> LoginUser(UserDto user)
        {
            var dbUser = _userManager.Users.FirstOrDefault(usr =>
                string.Equals(user.Email, usr.Email, StringComparison.CurrentCultureIgnoreCase));

            if (dbUser == null) throw new Exception("Non existent user");
            if (!dbUser.EmailConfirmed) throw new Exception("User non verified email");

            var userSigninResult = await _signInManager.PasswordSignInAsync(dbUser, user.Password, true, false);

            if (!userSigninResult.Succeeded) throw new Exception("Invalid password");
            var userRoles = await _userManager.GetRolesAsync(dbUser);
            var identityRoles = await _userManager.GetClaimsAsync(dbUser);
            var userRole = userRoles.First();
            var token = _jwtHelper.GenerateJwtToken(dbUser, userRole, identityRoles);
            return dbUser.ProjectUserToDtoUser(token, userRole);
        }

        public async Task<bool> ConfirmEmail(string userId, string emailToken)
        {
            var userIdDecoded = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(userId));
            var dboUser = _userManager.Users.Single(user => user.Id == userIdDecoded);
            var tokenUrlDecoded = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(emailToken));
            var result = await _userManager.ConfirmEmailAsync(dboUser, tokenUrlDecoded);
            return result.Succeeded;
        }

        public async Task AddEditEmployeesToStore(Store store, ICollection<EmployeeDto> employees)
        {
            var employeeRole = await _roleManager.Roles.SingleAsync(role => role.Name == "Employee");
            var dbStore = await _dbLjepotaServisContext.Stores.FindAsync(store.Id);
            var owner = await _userManager.GetUsersForClaimAsync(new Claim(ClaimTypes.Role, RoleHelper.Owner));
            var dbEmployees = await _userManager.GetUsersForClaimAsync(new Claim("Store", dbStore.Id.ToString()));
            dbEmployees = dbEmployees.Except(owner).ToList();
            var newEmployees = employees.Where(employee => employee.Id == null).ToList();
            employees = employees.Except(newEmployees).ToList();
            foreach (var newEmployee in newEmployees)
            {
                var employee = newEmployee.ProjectEmployeeDtoToUser();
                await _userManager.CreateAsync(employee, newEmployee.Password);
                await _userManager.AddToRoleAsync(employee, employeeRole.Name);
                await _userManager.AddClaimAsync(employee, new Claim("Store", store.Id.ToString()));
                await _userManager.AddClaimAsync(employee, new Claim(ClaimTypes.Role, employeeRole.Name));

                var userStore = new UserStore
                {
                    Store = store,
                    StoreId = store.Id,
                    User = employee,
                    UserId = employee.Id,
                    StartOfShift = newEmployee.StartOfShift,
                    EndOfShift = newEmployee.EndOfShift
                };
                await _dbLjepotaServisContext.AddAsync(userStore);
            }
            foreach (var dbEmployee in dbEmployees)
            {
                var isEdit = employees.Count != 0 && employees.All(employee => employee.Id != dbEmployee.Id);
                var employeeStore =_dbLjepotaServisContext.UserStores.Single(userStore => userStore.UserId == dbEmployee.Id);
                if (!isEdit)
                {
                    _dbLjepotaServisContext.UserStores.Remove(employeeStore);
                    await _userManager.DeleteAsync(dbEmployee);
                    continue;
                }
                var employeeDto = employees.Single(employee => employee.Id == dbEmployee.Id);
                var employeeOrNull = await _userManager.FindByIdAsync(employeeDto.Id);
                if (employeeOrNull == null) throw new Exception("User has ID which cannot be found in database");
                employeeOrNull.Email = employeeDto.Email;
                employeeOrNull.Firstname = employeeDto.FirstName;
                employeeOrNull.Lastname = employeeDto.LastName;
                employeeOrNull.Email = employeeDto.Email;
                employeeOrNull.UserName = employeeDto.Username;
                employeeOrNull.ImageName = employeeDto.ImageName;
                employeeStore.EndOfShift = employeeDto.EndOfShift;
                employeeStore.StartOfShift = employeeDto.EndOfShift;

                await _userManager.UpdateAsync(employeeOrNull);
            }
            await _dbLjepotaServisContext.SaveChangesAsync();
        }

        public async Task<bool> CheckEmailTaken(string email)
        {
            var isEmailTaken = await _dbLjepotaServisContext.Users.AnyAsync(user =>
                string.Equals(email, user.Email, StringComparison.CurrentCultureIgnoreCase));
            return isEmailTaken;
        }

        public async Task<bool> CheckUsernameTaken(string username)
        {
            var isUsernameTaken = await _dbLjepotaServisContext.Users.AnyAsync(user =>
                string.Equals(username, user.UserName, StringComparison.CurrentCultureIgnoreCase));
            return isUsernameTaken;
        }

        public async Task<ICollection<EmployeeDto>> GetEmployeesByStore(int storeId)
        {
            var store = await _dbLjepotaServisContext.Stores.FindAsync(storeId);
            if (store == null) throw new Exception("Store not exists");
            var usersWithStoreClaims =
                await _userManager.GetUsersForClaimAsync(new Claim("Store", store.Id.ToString()));
            var owner = await _userManager.GetUsersForClaimAsync(new Claim(ClaimTypes.Role, RoleHelper.Owner));
            usersWithStoreClaims = usersWithStoreClaims.Except(owner).ToList();
            var employeeStores = _dbLjepotaServisContext.UserStores.Where(userStore =>
                usersWithStoreClaims.Any(userWithStoreClaim => userStore.UserId == userWithStoreClaim.Id)).ToList();

            var employeesWithStoreClaim = usersWithStoreClaims.Select(userWithStoreClaim =>
            {
                var employeeStore = employeeStores.First(empStore => empStore.UserId == userWithStoreClaim.Id);
                return userWithStoreClaim.ProjectUserAndUserStoreToEmployeeDto(employeeStore);
            }).ToList();

            return employeesWithStoreClaim;
        }
    }
}
