using Microsoft.EntityFrameworkCore.Migrations;

namespace ljepotaservis.Data.Migrations
{
    public partial class addingportfoliostostore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Neighborhood",
                table: "Stores",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Portfolios",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    ImageName = table.Column<string>(nullable: true),
                    StoreId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Portfolios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Portfolios_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Discriminator", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "bfdfa84a-180a-4174-a84e-e2f353617625", "bf5c79a3-d99e-4197-8a73-3e1b06c0322b", "IdentityRole", "SuperAdmin", "SUPERADMIN" },
                    { "4c869e9f-6daa-440e-b943-b032cac7f8cf", "fa683cc9-923f-4da1-8aa8-e99a03a27bfb", "IdentityRole", "Owner", "OWNER" },
                    { "91febb14-a18d-4cbd-8e96-5ad86ed00d91", "53d327be-1f19-4e35-90e8-9c24870897dd", "IdentityRole", "Employee", "EMPLOYEE" },
                    { "f721bcab-5d43-4ab3-a6f7-77f77cc01a3d", "af133680-6be7-4d1a-9539-afcd47c0bdde", "IdentityRole", "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Portfolios_StoreId",
                table: "Portfolios",
                column: "StoreId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Portfolios");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4c869e9f-6daa-440e-b943-b032cac7f8cf");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "91febb14-a18d-4cbd-8e96-5ad86ed00d91");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bfdfa84a-180a-4174-a84e-e2f353617625");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f721bcab-5d43-4ab3-a6f7-77f77cc01a3d");

            migrationBuilder.DropColumn(
                name: "Neighborhood",
                table: "Stores");

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
    }
}
