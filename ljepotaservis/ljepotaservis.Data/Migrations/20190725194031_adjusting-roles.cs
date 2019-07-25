using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class adjustingroles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "07aa9e06-19b3-4d0c-95aa-ab9f560ecefa");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "57fb0c68-acd3-479b-8949-0c723d374dfe");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8191d8fb-92a4-4a48-992d-a1eb56ca4cab");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f0a5e6b5-492e-40b5-a32a-dbe578973967");

            migrationBuilder.DropColumn(
                name: "BusinessOib",
                table: "Stores");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "BusinessOib",
                table: "Stores",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "57fb0c68-acd3-479b-8949-0c723d374dfe", "98169c40-6e25-42fd-9f22-aaba1f3aaa5f", "IdentityRole", "SuperAdmin", null },
                    { "8191d8fb-92a4-4a48-992d-a1eb56ca4cab", "02251c0b-f0c8-4522-b0ce-2cb3d07eed12", "IdentityRole", "Owner", null },
                    { "f0a5e6b5-492e-40b5-a32a-dbe578973967", "39f2cfb0-f651-43eb-be23-38169ecffb29", "IdentityRole", "Employee", null },
                    { "07aa9e06-19b3-4d0c-95aa-ab9f560ecefa", "51b4deac-1bb6-4101-a084-7b6563f919bf", "IdentityRole", "User", null }
                });
        }
    }
}
