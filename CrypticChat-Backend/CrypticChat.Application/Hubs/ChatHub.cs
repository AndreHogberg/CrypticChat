using Microsoft.AspNetCore.SignalR;

namespace CrypticChat.Api.Hubs;

public class ChatHub : Hub
{
    public ChatHub()
    {
        
    }

    public async Task ConnectUsers(string friendChatId)
    {
    }
}