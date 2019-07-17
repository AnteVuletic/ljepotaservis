using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace ljepotaservis.Entities.Data
{
    public class LjepotaServisContext : DbContext
    {
        public LjepotaServisContext(DbContextOptions options) : base(options)
        {}

        public DbSet<Business> Businesses { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationService> ReservationServices { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserStore> UserStores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Business>().HasKey(business => business.Oib);

            ConfigureUserStore(modelBuilder);
            ConfigureReservationService(modelBuilder);
        }

        private static void ConfigureUserStore(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserStore>()
                .HasOne(userStore => userStore.Store)
                .WithMany(store => store.UserStores)
                .HasForeignKey(userStore => userStore.StoreId);

            modelBuilder.Entity<UserStore>()
                .HasOne(userStore => userStore.User)
                .WithMany(user => user.UserStores)
                .HasForeignKey(userStore => userStore.UserId);
        }

        private static void ConfigureReservationService(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReservationService>()
                .HasKey(reservationService => new
                {
                    reservationService.ServiceId,
                    reservationService.ReservationId
                });

            modelBuilder.Entity<ReservationService>()
                .HasOne(reservationService => reservationService.Reservation)
                .WithMany(reservation => reservation.ReservationServices)
                .HasForeignKey(reservationService => reservationService.ReservationId);

            modelBuilder.Entity<ReservationService>()
                .HasOne(reservationService => reservationService.Service)
                .WithMany(service => service.ReservationServices)
                .HasForeignKey(reservationService => reservationService.ServiceId);
        }
    }
}
