using System;
using System.Collections.Generic;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Data.Enums;
using ljepotaservis.Infrastructure.DataTransferObjects.ServicesDtos;
using ljepotaservis.Infrastructure.Helpers;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class StoreDetailDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string OpenCloseTime { get; set; }
        public DateTime OpenTime { get; set; }
        public DateTime CloseTime { get; set; }
        public int Score { get; set; }
        public string ImageName { get; set; }
        public string Neighborhood { get; set; }
        public StoreType Type { get; set; }
        public ICollection<EmployeeDto> EmployeeDetails { get; set; }
        public ICollection<ServiceDto> Services { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static StoreDetailDto ProjectStoreToStoreDetailDto(this Store store, int rating, ICollection<EmployeeDto> employeeDetails, ICollection<ServiceDto> services)
        {
            return new StoreDetailDto
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address,
                OpenCloseTime = $"{store.OpenDateTime.FormatOpenClose()} -  {store.ClosingDateTime.FormatOpenClose()}",
                OpenTime = store.OpenDateTime,
                CloseTime = store.ClosingDateTime,
                Score = rating,
                ImageName = store.ImageName,
                Neighborhood = store.Neighborhood,
                Type = store.Type,
                EmployeeDetails = employeeDetails,
                Services = services
            };
        }
    }
}
