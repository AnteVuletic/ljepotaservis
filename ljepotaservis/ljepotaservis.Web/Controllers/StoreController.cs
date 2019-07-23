using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Repositories.Implementations;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public StoreController(
            IStoreRepository storeRepository,
            UserManager<User> userManager,
            RoleManager<ApplicationRole> roleManager)
        {
            _storeRepository = storeRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> AddEmployeesToStore([FromBody] ICollection<UserDto> employees)
        {
            var store = await ResolveStore();

            var employeeRole = _roleManager.Roles.Single(role => role.Name == "Employee");
            foreach (var employee in employees)
            {
                var userDb = UserDto.ProjectUserDtoToUser(employee, true);
                await _userManager.CreateAsync(userDb, employee.Password);
                await _userManager.AddToRoleAsync(userDb, employeeRole.Name);
                await _userManager.AddClaimAsync(userDb , new Claim("Store", store.Id.ToString()));
            }
            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> AddEditServicesToStore([FromBody] StoreDto storeDto)
        {
            var store = await ResolveStore();
            if (storeDto.Store.Id != store.Id) return Unauthorized();

            await _storeRepository.AddEditServicesToStore(storeDto);
            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> AddEditEmployeesToStore([FromBody] StoreDto storeDto)
        {
            var store = await ResolveStore();
            if (storeDto.Store.Id != store.Id) return Unauthorized();
            await _storeRepository.AddEditEmployeesToStore(storeDto);
            return Ok();
        }

        private async Task<Store> ResolveStore()
        {
            var ownerClaims = HttpContext.User.Claims.Single(claim => claim.Type == "Store");
            var storeId = int.Parse(ownerClaims.Value);
            var store = await _storeRepository.GetStoreById(storeId);
            return store;
        }
    }
}