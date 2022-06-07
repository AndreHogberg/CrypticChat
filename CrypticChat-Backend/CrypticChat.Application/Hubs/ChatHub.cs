using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CrypticChat.Application.Hubs;
[Authorize]
public class ChatHub : Hub
{
    public ChatHub()
    {
        
    }

    public async Task NewMessage(string userName, string message)
    {
        await Clients.User(Context.UserIdentifier).SendAsync("recieveMessage", userName, message);
    }
}