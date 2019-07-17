using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class AddingUserType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsEmployee",
                table: "UserStores");

            migrationBuilder.DropColumn(
                name: "IsOwner",
                table: "UserStores");

            migrationBuilder.DropColumn(
                name: "IsUer",
                table: "UserStores");

            migrationBuilder.AddColumn<int>(
                name: "UserType",
                table: "UserStores",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserType",
                table: "UserStores");

            migrationBuilder.AddColumn<bool>(
                name: "IsEmployee",
                table: "UserStores",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsOwner",
                table: "UserStores",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsUer",
                table: "UserStores",
                nullable: false,
                defaultValue: false);
        }
    }
}
