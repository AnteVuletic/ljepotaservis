using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class addingtypeofstore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Stores",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Stores");

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
    }
}
