using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class fixingissuesavingtimespan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "901fbf40-636d-4339-bd9b-64b895772ea4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9cdede97-f681-4bd4-8f31-57433f35d09a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ca77e91a-d79c-41fa-973c-1dc4c37c16f5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f7e2683d-c68d-41b7-a95e-062066642b7f");

            migrationBuilder.DropColumn(
                name: "Duration",
                table: "Services");

            migrationBuilder.AddColumn<long>(
                name: "DurationTicks",
                table: "Services",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "aed14f3c-c6bc-4c25-9627-2479d0febe08", "de1035ff-fe27-4634-8865-efae7ac702de", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "09d86526-c653-42a3-93a8-71f3b220101d", "7ea4e211-ead5-4108-9fa9-d9d848628912", "IdentityRole", "Owner", "OWNER" },
                    { "cb3f0b72-4521-431e-a07c-934ef3e56303", "2ca5dd25-c440-42dd-a14b-1d02836afe07", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "bf76ea71-c97a-4d2f-bb1e-12576bfe2580", "2107b290-58bf-4a16-879f-e451304b6c91", "IdentityRole", "User", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "09d86526-c653-42a3-93a8-71f3b220101d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aed14f3c-c6bc-4c25-9627-2479d0febe08");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bf76ea71-c97a-4d2f-bb1e-12576bfe2580");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cb3f0b72-4521-431e-a07c-934ef3e56303");

            migrationBuilder.DropColumn(
                name: "DurationTicks",
                table: "Services");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "Duration",
                table: "Services",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "901fbf40-636d-4339-bd9b-64b895772ea4", "9288a5cf-7bfb-4a9f-a016-cea3e5b4b4e2", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "9cdede97-f681-4bd4-8f31-57433f35d09a", "320380c3-d376-4553-9738-c1ba61060d72", "IdentityRole", "Owner", "OWNER" },
                    { "f7e2683d-c68d-41b7-a95e-062066642b7f", "cf300468-5f1d-4c20-99ff-206d6a65fd50", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "ca77e91a-d79c-41fa-973c-1dc4c37c16f5", "8c7e26fb-648f-4eea-8194-b975f3ba36e2", "IdentityRole", "User", "USER" }
                });
        }
    }
}
