using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrypticChat.Persistance.Migrations
{
    public partial class newSc20 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChatRoomId",
                table: "Friends");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChatRoomId",
                table: "Friends",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
