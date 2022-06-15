using System.Security.Claims;
using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrypticChat.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly DataContext _context;

    public ChatController(DataContext context)
    {
        _context = context;
    }
    [HttpGet("{friendId}")]
    public async Task<IActionResult> ChatMessagesAndInfo(string friendId)
    {
        var messages = await _context.Messages.Where(x => x.FriendId == Guid.Parse(friendId)).Include(x => x.Sender).OrderBy(x => x.SentAt).ToListAsync();
        var messageDtos = MapToMessageDtoList(messages);
        return Ok(new { Messages = messageDtos});
    }


    private List<MessageDto> MapToMessageDtoList(List<Message> messages)
    {
        List<MessageDto> messageDtos = new();

        foreach (var message in messages)
        {
            messageDtos.Add(new()
            {
                Message = message.Text,
                Date = message.SentAt,
                Sender = message.Sender.UserName
            });
        }

        return messageDtos;
    }
}