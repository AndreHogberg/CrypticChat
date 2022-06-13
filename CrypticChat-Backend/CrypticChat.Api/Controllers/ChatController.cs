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
        var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userClaim is null)
        {
            return Unauthorized();
        }
        var userId = userClaim.Value;
        var chatRoom = await _context.Friends.SingleOrDefaultAsync(x =>
            (x.UserOneId == userId || x.UserTwoId == userId) && (x.UserOneId == friendId || x.UserTwoId == friendId));
        if (chatRoom == null)
        {
            return BadRequest();
        }
        
        var messages = await _context.Messages.Where(x => x.FriendId == chatRoom.Id).Include(x => x.Sender).OrderBy(x => x.SentAt).ToListAsync();
        var messageDtos = MapToMessageDtoList(messages);
        return Ok(new { Messages = messageDtos, ChatRoomId = chatRoom.Id });
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