using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IStoreRepository _storeRepository;

        public ReservationController(
            IReservationRepository reservationRepository,
            IStoreRepository storeRepository)
        {
            _reservationRepository = reservationRepository;
            _storeRepository = storeRepository;
        }

        [HttpPost]
        [Authorize(Roles = "Owner, User, Employee")]
        public async Task<IActionResult> Create([FromBody] CreateReservationDto createReservationDto)
        {
            await _reservationRepository.Create(createReservationDto.Client, createReservationDto.Employee,
                createReservationDto.ReservationServiceDto);

            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = "Owner, Employee")]
        public async Task<IActionResult> GetByEmployee([FromBody] UserDto userEmployee)
        {
            var reservations = await _reservationRepository.GetCurrentReservationsByEmployee(userEmployee);

            return Ok(reservations);
        }

        [HttpPost]
        [Authorize(Roles = "Owner")]
        public async Task<IActionResult> GetReservations()
        {
            var store = await ResolveStore();
            var reservations = await _reservationRepository.GetReservationsByStore(store);

            return Ok(reservations);
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetByUser([FromBody] UserDto client)
        {
            var reservations = await _reservationRepository.GetReservationsByUser(client);

            return Ok(reservations);
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