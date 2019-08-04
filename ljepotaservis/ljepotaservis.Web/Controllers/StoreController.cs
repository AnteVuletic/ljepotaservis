using System;
using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Data.Enums;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;
        private readonly IUserRepository _userRepository;

        public StoreController(
            IStoreRepository storeRepository,
            IUserRepository userRepository)
        {
            _storeRepository = storeRepository;
            _userRepository = userRepository;
        }

        [HttpPost]
        [Authorize(Roles = RoleHelper.Owner)]
        public async Task<IActionResult> AddEditServicesToStore([FromBody] ServicesDto servicesDto)
        {
            var store = await ResolveStore();
            var services = servicesDto.Services.Select(service => service.ProjectServiceDtoToService()).ToList();
            await _storeRepository.AddEditServicesToStore(store, services);
            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = RoleHelper.Owner)]
        public async Task<IActionResult> AddEditEmployeesToStore([FromBody] EmployeesDto employees)
        {
            var store = await ResolveStore();
            await _userRepository.AddEditEmployeesToStore(store, employees.Employees);
            return Ok();
        }


        [Authorize(Roles = RoleHelper.SuperAdmin)]
        [HttpPost]
        public async Task<IActionResult> CreateStoreAndOwner([FromBody] JObject storeAndOwner )
        {
            var store = storeAndOwner["store"].ToObject<Store>();
            var owner = storeAndOwner["owner"].ToObject<UserDto>();

            await _storeRepository.CreateStoreAndOwner(store, owner);
            return Ok();
        }


        [Authorize(Roles = RoleHelper.Owner)]
        [HttpGet]
        public async Task<IActionResult> GetStoreServices([FromRoute] int storeId)
        {
            var store = await ResolveStore();
            var services = await _storeRepository.GetStoreServices(store.Id);
            var servicesDto = new ServicesDto
            {
                Services = services.Select((Service service) => service.ProjectServiceToServiceDto()).ToList()
            };
            return Ok(servicesDto);
        }

        [Authorize(Roles = RoleHelper.Owner)]
        [HttpGet]
        public async Task<IActionResult> GetStoreEmployees()
        {
            var store = await ResolveStore();
            var employees = await _userRepository.GetEmployeesByStore(store.Id);

            return Ok(employees);
        }

        [Authorize(Roles = RoleHelper.SuperAdmin)]
        [HttpGet]
        public IActionResult GetStoreTypes()
        {
            var storeTypes = Enum.GetValues(typeof(StoreType)).Cast<StoreType>().ToList();
            return Ok(storeTypes);
        }

        [Authorize(Roles = RoleHelper.Owner)]
        public async Task<IActionResult> GetStoreWorkingHours()
        {
            var store = await ResolveStore();
            var storeWorkingHoursDto = _storeRepository.GetStoreWorkingHours(store.Id);

            return Ok(storeWorkingHoursDto);
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