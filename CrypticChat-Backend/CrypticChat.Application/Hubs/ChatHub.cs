using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CrypticChat.Application.Hubs;
[Authorize]
public class ChatHub : Hub
{
    private readonly DataContext _dataContext;

    public ChatHub(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task ConnectToRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }
    public async Task NewMessage(string message, string roomId, string senderUser)
    {
        await Clients.Group(roomId).SendAsync("recieveMessage", senderUser, message, DateTime.Now);
    }
}