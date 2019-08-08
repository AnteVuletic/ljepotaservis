using System;
using System.Threading.Tasks;
using ljepotaservis.Data.Enums;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.FilterDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FilterController : ControllerBase
    {
        private readonly IFilterRepository _filterRepository;

        public FilterController(IFilterRepository filterRepository)
        {
            _filterRepository = filterRepository;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> GetFilteredStores([FromBody] JObject searchFilterDtoJObject)
        {
            var searchFilterDto = new SearchFilterDto(searchFilterDtoJObject);

            var stores = await _filterRepository.GetFilteredStores(searchFilterDto);
            return Ok(stores);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetStoreNeighborhoods()
        {
            var neighborhoods = _filterRepository.GetDistinctStoreNeighborhoods();

            return Ok(neighborhoods);
        }
    }
}