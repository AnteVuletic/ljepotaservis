﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ljepotaservis.Entities.Data;

namespace ljepotaservis.Data.Migrations
{
    [DbContext(typeof(LjepotaServisContext))]
    [Migration("20190717062247_Fixing-Relation-Between-Store-Business")]
    partial class FixingRelationBetweenStoreBusiness
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Business", b =>
                {
                    b.Property<string>("Oib")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("Name");

                    b.HasKey("Oib");

                    b.ToTable("Businesses");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Rating");

                    b.Property<DateTime>("TimeOfReservation");

                    b.Property<int>("UserStoreId");

                    b.HasKey("Id");

                    b.HasIndex("UserStoreId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.ReservationService", b =>
                {
                    b.Property<int>("ServiceId");

                    b.Property<int>("ReservationId");

                    b.HasKey("ServiceId", "ReservationId");

                    b.HasIndex("ReservationId");

                    b.ToTable("ReservationServices");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Resource", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("OwnerId");

                    b.Property<string>("Path");

                    b.Property<int>("ResourceType");

                    b.HasKey("Id");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<TimeSpan>("Duration");

                    b.Property<string>("Name");

                    b.Property<int>("Price");

                    b.Property<int>("StoreId");

                    b.HasKey("Id");

                    b.HasIndex("StoreId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Store", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<string>("BusinessOib");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("BusinessOib");

                    b.ToTable("Stores");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Firstname");

                    b.Property<string>("Lastname");

                    b.Property<string>("Password");

                    b.Property<DateTime>("RegistrationDate");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.UserStore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsEmployee");

                    b.Property<bool>("IsOwner");

                    b.Property<bool>("IsUer");

                    b.Property<int>("StoreId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("StoreId");

                    b.HasIndex("UserId");

                    b.ToTable("UserStores");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Reservation", b =>
                {
                    b.HasOne("ljepotaservis.Data.Entities.Models.UserStore", "UserStore")
                        .WithMany("Reservations")
                        .HasForeignKey("UserStoreId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.ReservationService", b =>
                {
                    b.HasOne("ljepotaservis.Data.Entities.Models.Reservation", "Reservation")
                        .WithMany("ReservationServices")
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ljepotaservis.Data.Entities.Models.Service", "Service")
                        .WithMany("ReservationServices")
                        .HasForeignKey("ServiceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Service", b =>
                {
                    b.HasOne("ljepotaservis.Data.Entities.Models.Store", "Store")
                        .WithMany("Services")
                        .HasForeignKey("StoreId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.Store", b =>
                {
                    b.HasOne("ljepotaservis.Data.Entities.Models.Business", "Business")
                        .WithMany("Stores")
                        .HasForeignKey("BusinessOib");
                });

            modelBuilder.Entity("ljepotaservis.Data.Entities.Models.UserStore", b =>
                {
                    b.HasOne("ljepotaservis.Data.Entities.Models.Store", "Store")
                        .WithMany("UserStores")
                        .HasForeignKey("StoreId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ljepotaservis.Data.Entities.Models.User", "User")
                        .WithMany("UserStores")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
