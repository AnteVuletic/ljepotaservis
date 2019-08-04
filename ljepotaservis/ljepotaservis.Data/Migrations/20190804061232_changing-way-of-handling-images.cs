using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class changingwayofhandlingimages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "02e3edc2-46f8-4a62-88b7-52054e933df4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "03d3ca33-82e2-4ced-9dbc-af65242edf2a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "542c5d70-47f0-4db6-b0aa-9e0214561f70");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f693f8e0-bf21-4ae8-ad07-13681864e25a");

            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "Stores",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageName",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "e3366ea9-f25b-4df3-83e1-3088da87a575", "5f0fed46-3293-4051-b5b5-d6c6084c40bd", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "e54d0212-892b-4066-be61-b3bd47fe20b6", "f3d376aa-478a-4466-9f17-6d39e32a8d46", "IdentityRole", "Owner", "OWNER" },
                    { "fde96db8-52db-4979-ab10-af354696975d", "613ae338-a7d9-48cf-839a-bc233d30fd01", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "b7da2026-faa8-485b-bb9b-6917d1523b57", "86c430d7-7cdc-4a02-b4a7-6858ab4d6a69", "IdentityRole", "User", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b7da2026-faa8-485b-bb9b-6917d1523b57");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e3366ea9-f25b-4df3-83e1-3088da87a575");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e54d0212-892b-4066-be61-b3bd47fe20b6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fde96db8-52db-4979-ab10-af354696975d");

            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "ImageName",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    OwnerId = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true),
                    ResourceType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "542c5d70-47f0-4db6-b0aa-9e0214561f70", "c225a10b-0b0f-4aff-8913-3fd8a9c7edeb", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "02e3edc2-46f8-4a62-88b7-52054e933df4", "f0d14b50-082c-4f3e-b716-81ff4df32aea", "IdentityRole", "Owner", "OWNER" },
                    { "f693f8e0-bf21-4ae8-ad07-13681864e25a", "3fd59f88-59b3-4b1f-8346-1ca9ef89b0a1", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "03d3ca33-82e2-4ced-9dbc-af65242edf2a", "a2634c73-1646-42dc-91bd-32f7a68bfa95", "IdentityRole", "User", "USER" }
                });
        }
    }
}
