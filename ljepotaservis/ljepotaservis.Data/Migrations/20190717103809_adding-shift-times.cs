using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class addingshifttimes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EndOfShift",
                table: "UserStores",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartOfShift",
                table: "UserStores",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ClosingDateTime",
                table: "Stores",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "OpenDateTime",
                table: "Stores",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndOfShift",
                table: "UserStores");

            migrationBuilder.DropColumn(
                name: "StartOfShift",
                table: "UserStores");

            migrationBuilder.DropColumn(
                name: "ClosingDateTime",
                table: "Stores");

            migrationBuilder.DropColumn(
                name: "OpenDateTime",
                table: "Stores");
        }
    }
}
