﻿using System.Text.RegularExpressions;
using CrypticChat.Application.dtos;
using CrypticChat.Domain;
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
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }
    public async Task NewMessage(string message, string roomId)
    {
        var newMessage = new Message()
        {
            ChatRoomId = Guid.Parse(roomId),
            Id = Guid.NewGuid(),
            SenderId = Context.UserIdentifier,
            SentAt = DateTime.Now,
            Text = message
        };
        var messageSaved = await _dataContext.SaveChangesAsync() > 0;
        await Clients.Group(roomId).SendAsync("recieveMessage", new MessageDto{Message = newMessage.Text, Date = newMessage.SentAt, Sender = "Arkuna"});
    }
}