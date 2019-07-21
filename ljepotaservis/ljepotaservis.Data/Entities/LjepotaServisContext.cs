using System;
using System.Collections.Generic;
using System.Text;
using ljepotaservis.Data.Entities.Models;
using ljepotaservis.Data.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserStore = ljepotaservis.Data.Entities.Models.UserStore;

namespace ljepotaservis.Entities.Data
{
    public class LjepotaServisContext : IdentityDbContext<User>
    {
        public LjepotaServisContext(DbContextOptions options) : base(options)
        {}

        public DbSet<Business> Businesses { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationService> ReservationServices { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<UserStore> UserStores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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

            modelBuilder.Entity<UserStore>()
                .HasMany(userStore => userStore.Reservations)
                .WithOne(reservation => reservation.UserStoreEmployee)
                .HasForeignKey(reservation => reservation.UserStoreEmployeeId);
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