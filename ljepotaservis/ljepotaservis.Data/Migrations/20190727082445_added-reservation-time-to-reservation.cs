using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class addedreservationtimetoreservation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6032c70a-703a-4a72-bbbb-420dbcad4006");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a383f14f-fdf3-479b-90be-7874128f36bc");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c6734644-1172-44f7-839d-751b10182058");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c799e78c-6a7e-4f91-aad7-ed946434ab66");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndOfReservation",
                table: "Reservations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "26295904-4546-44e5-8018-3ca57e790867", "25651f8d-9712-45d0-b910-62904f7c0b70", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "4afe4537-7f37-47b0-aaf4-b4c253c9619f", "ff485cd1-d571-483e-a958-e899e1049480", "IdentityRole", "Owner", "OWNER" },
                    { "65933c86-6de0-49d2-a5e0-398c59decfe0", "6188cc65-df17-49b9-b6aa-6ed82c22e4cb", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "cb4833d6-9894-476d-9f86-09766d012ec5", "bb2042b7-9bc9-4a69-93d7-afedc28badab", "IdentityRole", "User", "USER" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "26295904-4546-44e5-8018-3ca57e790867");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4afe4537-7f37-47b0-aaf4-b4c253c9619f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "65933c86-6de0-49d2-a5e0-398c59decfe0");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cb4833d6-9894-476d-9f86-09766d012ec5");

            migrationBuilder.DropColumn(
                name: "EndOfReservation",
                table: "Reservations");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a383f14f-fdf3-479b-90be-7874128f36bc", "e592eeda-2c7b-45e0-847c-2b92c1065cd6", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "6032c70a-703a-4a72-bbbb-420dbcad4006", "5220d211-5c42-429d-8edd-722c7a88ce88", "IdentityRole", "Owner", "OWNER" },
                    { "c6734644-1172-44f7-839d-751b10182058", "54e9931f-26c5-46be-8771-889ee2f87f1d", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "c799e78c-6a7e-4f91-aad7-ed946434ab66", "80778c04-d79b-42d8-abd7-558aeb3ae337", "IdentityRole", "User", "USER" }
                });
        }
    }
}
