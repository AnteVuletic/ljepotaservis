using System;
using System.Linq;
using System.Threading.Tasks;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Domain.Repositories.Interfaces;
using ljepotaservis.Infrastructure.DataTransferObjects.ReservationDtos;
using ljepotaservis.Infrastructure.DataTransferObjects.UserDtos;
using ljepotaservis.Infrastructure.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ljepotaservis.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IStoreRepository _storeRepository;
        private readonly UserManager<User> _userManager;

        public ReservationController(
            IReservationRepository reservationRepository,
            IStoreRepository storeRepository,
            UserManager<User> userManager)
        {
            _reservationRepository = reservationRepository;
            _storeRepository = storeRepository;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize(Roles = RoleHelper.User)]
        public async Task<IActionResult> Create([FromBody] JObject createReservationDtoJObject)
        {
            var createReservationDto = new CreateReservationDto(createReservationDtoJObject);
            await _reservationRepository.Create(createReservationDto);

            return Ok();
        }

        [HttpPost]
        [Authorize(Roles = RoleHelper.Employee)]
        public async Task<IActionResult> GetByDate([FromBody] JObject dateJObject)
        {
            var employee = await _userManager.GetUserAsync(HttpContext.User);
            var dateObject = dateJObject["date"].ToObject<DateTime>().AddHours(2);
            var reservations = await _reservationRepository.GetReservationsForEmployeeByDate(employee, dateObject);

            return Ok(reservations);
        }

        [HttpPost]
        [Authorize(Roles = RoleHelper.Owner)]
        public async Task<IActionResult> GetReservations()
        {
            var store = await ResolveStore();
            var reservations = await _reservationRepository.GetReservationsByStore(store);

            return Ok(reservations);
        }

        [HttpPost]
        [Authorize(Roles = RoleHelper.User)]
        public async Task<IActionResult> SetRatingByReservation([FromBody] JObject reservationRatingJObject)
        {
            var reservation = reservationRatingJObject["reservationRating"]["reservation"].ToObject<Reservation>();
            var rating = int.Parse(reservationRatingJObject["reservationRating"]["rating"].ToString());

            await _reservationRepository.SetRatingByReservation(reservation, rating);
            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = RoleHelper.User)]
        public async Task<IActionResult> GetByUser()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var client = user.ProjectUserToDtoUser();
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