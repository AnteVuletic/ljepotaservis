using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;

namespace ljepotaservis.Domain.Repositories.Interfaces
{
    public interface IServiceRepository
    {
        void Create(Service service, Store store);
        void Update(Service serviceToUpdate, Service service);
        ICollection<Service> GetServicesByName(string name);
        ICollection<Service> GetServicesByStore(Store store);
        void Delete(Service service);

    }
}
