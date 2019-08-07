namespace ljepotaservis.Data.Entities.Models
{
    public class Portfolio
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public string ImageName { get; set; }
        public int StoreId { get; set; }
        public Store Store { get; set; }
    }
}
