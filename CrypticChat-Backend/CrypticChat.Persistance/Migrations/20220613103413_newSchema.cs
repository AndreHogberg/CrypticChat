using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CrypticChat.Persistance.Migrations
{
    public partial class newSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages");

            migrationBuilder.DropTable(
                name: "ChatRooms");

            migrationBuilder.DropTable(
                name: "FriendRequests");

            migrationBuilder.RenameColumn(
                name: "ChatRoomId",
                table: "Messages",
                newName: "FriendId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_ChatRoomId",
                table: "Messages",
                newName: "IX_Messages_FriendId");

            migrationBuilder.AddColumn<string>(
                name: "ChatRoomId",
                table: "Friends",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmed",
                table: "Friends",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Friends_FriendId",
                table: "Messages",
                column: "FriendId",
                principalTable: "Friends",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Friends_FriendId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "ChatRoomId",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "IsConfirmed",
                table: "Friends");

            migrationBuilder.RenameColumn(
                name: "FriendId",
                table: "Messages",
                newName: "ChatRoomId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_FriendId",
                table: "Messages",
                newName: "IX_Messages_ChatRoomId");

            migrationBuilder.CreateTable(
                name: "ChatRooms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserOneId = table.Column<string>(type: "text", nullable: false),
                    UserTwoId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatRooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChatRooms_AspNetUsers_UserOneId",
                        column: x => x.UserOneId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChatRooms_AspNetUsers_UserTwoId",
                        column: x => x.UserTwoId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FriendRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    RecieverId = table.Column<string>(type: "text", nullable: false),
                    SenderId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FriendRequests_AspNetUsers_RecieverId",
                        column: x => x.RecieverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FriendRequests_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatRooms_UserOneId",
                table: "ChatRooms",
                column: "UserOneId");

            migrationBuilder.CreateIndex(
                name: "IX_ChatRooms_UserTwoId",
                table: "ChatRooms",
                column: "UserTwoId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequests_RecieverId",
                table: "FriendRequests",
                column: "RecieverId");

            migrationBuilder.CreateIndex(
                name: "IX_FriendRequests_SenderId",
                table: "FriendRequests",
                column: "SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
