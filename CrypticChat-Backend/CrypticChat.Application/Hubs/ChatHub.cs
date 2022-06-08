using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CrypticChat.Application.Hubs;
[Authorize]
public class ChatHub : Hub
{
    public ChatHub()
    {
        
    }

    public async Task NewMessage(string message, string id, string senderUser)
    {
        await Clients.User(Context.UserIdentifier).SendAsync("recieveMessage", senderUser, message, DateTime.Now);
    }
}