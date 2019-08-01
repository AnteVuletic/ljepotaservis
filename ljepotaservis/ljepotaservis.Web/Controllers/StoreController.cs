using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
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
        public async Task<IActionResult> AddEditEmployeesToStore([FromBody] ICollection<UserDto> employees)
        {
            var store = await ResolveStore();
            await _userRepository.AddEditEmployeesToStore(store, employees);
            return Ok();
        }


        [Authorize(Roles = "SuperAdmin")]
        [HttpPost]
        public async Task<IActionResult> CreateStoreAndOwner([FromBody] JObject storeAndOwner )
        {
            var store = storeAndOwner["store"].ToObject<Store>();
            var owner = storeAndOwner["owner"].ToObject<UserDto>();

            await _storeRepository.CreateStoreAndOwner(store, owner);
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