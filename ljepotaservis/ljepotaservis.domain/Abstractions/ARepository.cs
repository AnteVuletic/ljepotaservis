using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Entities.Data;

namespace ljepotaservis.Domain.Abstractions
{
    public abstract class ARepository
    {
        private readonly LjepotaServisContext _ljepotaServisContext;

        protected ARepository(LjepotaServisContext ljepotaServisContext)
        {
            _ljepotaServisContext = ljepotaServisContext;
        }
    }
}
