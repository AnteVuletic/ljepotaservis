using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Data.Enums;
using ljepotaservis.Infrastructure.Helpers;

namespace ljepotaservis.Infrastructure.DataTransferObjects.StoreDtos
{
    public class StoreDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string OpenCloseTime { get; set; }
        public int Score { get; set; }
        public string ImageName { get; set; }
        public string Neighborhood { get; set; }
        public StoreType Type { get; set; }
    }

    public static partial class QueryableExtensions
    {
        public static StoreDto ProjectStoreToStoreDto(this Store store, int rating)
        {
            return new StoreDto
            {
                Id = store.Id,
                Name = store.Name,
                Address = store.Address,
                OpenCloseTime = $"{store.OpenDateTime.FormatOpenClose()} - {store.ClosingDateTime.FormatOpenClose()}",
                Score = rating,
                ImageName = store.ImageName,
                Neighborhood =  store.Neighborhood,
                Type = store.Type
            };
        }
    }
}
