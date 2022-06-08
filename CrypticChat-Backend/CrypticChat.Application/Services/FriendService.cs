using CrypticChat.Application.dtos;
using CrypticChat.Application.Hubs;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace CrypticChat.Application.Services;

public class FriendService
{
    private readonly DataContext _dataContext;
    private readonly IHubContext<ChatHub> _hubContext;

    public FriendService(DataContext dataContext, IHubContext<ChatHub> hubContext)
    {
        _dataContext = dataContext;
        _hubContext = hubContext;
    }


    public async Task<bool> AddFriend(AddFriendRequestDto addFriendRequestDto, string SenderId)
    {
        var personExists = await _dataContext.Users.SingleOrDefaultAsync(x => x.Email == addFriendRequestDto.email);
        if (personExists != null)
        {
            _dataContext.FriendRequests.Add(new()
            {
                Id = Guid.NewGuid(),
                SenderId = SenderId,
                RecieverId = personExists.Id
            });
            await _hubContext.Clients.User(personExists.Email).SendCoreAsync("friendRequests", new []{SenderId});
        }
        return await _dataContext.SaveChangesAsync() > 0;
    }
    
}