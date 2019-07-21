using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Entities.Data;

namespace ljepotaservis.Domain.Abstractions
{
    public abstract class ARepository
    {
        public readonly LjepotaServisContext _dbLjepotaServisContext;

        protected ARepository(LjepotaServisContext dbLjepotaServisContext)
        {
            _dbLjepotaServisContext = dbLjepotaServisContext;
        }
    }
}
