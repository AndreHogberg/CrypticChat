using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CrypticChat.Application.Hubs;
[Authorize]
public class FriendHub : Hub
{
}