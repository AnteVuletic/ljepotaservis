using System.Collections.Generic;
using ljepotaservis.Data.Entities.Models;
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

        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationService> ReservationServices { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<UserStore> UserStores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            ConfigureUserRoles(modelBuilder);
            ConfigureUserStore(modelBuilder);
            ConfigureReservationService(modelBuilder);
        }

        private static void ConfigureUserRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>()
                .HasData(new List<IdentityRole>
                    {
                        new IdentityRole
                        {
                            Name = "SuperAdmin",
                            NormalizedName = "SUPERADMIN"
                        },
                        new IdentityRole
                        {
                            Name = "Owner",
                            NormalizedName = "OWNER"
                        },
                        new IdentityRole
                        {
                            Name = "Employee",
                            NormalizedName = "EMPLOYEE"
                        },
                        new IdentityRole
                        {
                            Name = "User",
                            NormalizedName = "USER"
                        }
                    }
                );

            modelBuilder.Entity<User>()
                .HasMany(user => user.Claims)
                .WithOne(user => user.User)
                .HasForeignKey(userClaim => userClaim.UserId)
                .IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(user => user.UserRoles)
                .WithOne(userRoles => userRoles.User)
                .HasForeignKey(userRole => userRole.UserId)
                .IsRequired();

            modelBuilder.Entity<ApplicationRole>()
                .HasMany(applicationRole => applicationRole.UserRoles)
                .WithOne(userRole => userRole.Role)
                .HasForeignKey(userRole => userRole.RoleId)
                .IsRequired();
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