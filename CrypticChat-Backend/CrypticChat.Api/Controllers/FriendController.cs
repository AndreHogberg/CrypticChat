using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Mvc;

namespace CrypticChat.Api.Controllers
{
    [ApiController]
    [Route("/api/user/")]
    public class FriendController : Controller
    {
        private readonly DataContext _context;

        public FriendController(DataContext context)
        {
            context = _context;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFriend(AddFriendDto addFriendDto)
        {
            var friendrequest = _context.Friends.Where(x => x.UserOneId == addFriendDto.UserOneId).ToList();
            if (friendrequest != null)
            {
                foreach (var friend in friendrequest)
                {
                    if (friend.UserTwoId == addFriendDto?.UserTwoId && friend.IsConfirmed == false)
                    {
                        return BadRequest("You have already sent an friend request to this user");
                    }
                    if (friend.UserTwoId == addFriendDto?.UserTwoId)
                    {
                        return BadRequest("You are already friends with this user");
                    }
                }
            }

            _context.Friends.Add(new Friend
            {
                UserOneId = addFriendDto.UserOneId,
                UserTwoId = addFriendDto.UserTwoId,
                ChatRoomId = new Guid().ToString(),
                IsConfirmed = false
            });

            await _context.SaveChangesAsync();
            return Ok(friendrequest);
        }

        public async Task<IActionResult> AnswerRequest(RequestAnswer answer)
        {
            if (answer.Answer == false)
            {
                _context.Friends.Remove(_context.Friends.Where(x => x.UserOneId == answer.UserOneId &&
                  x.UserTwoId == answer.UserTwoId).FirstOrDefault());
            }
            else
            {
                var friendRequest = _context.Friends.Where(x => x.UserOneId == answer.UserOneId &&
                x.UserTwoId == answer.UserTwoId).FirstOrDefault();

                friendRequest.IsConfirmed = true;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        public async Task<IActionResult> GetFriends(string userId)
        {
            var friendsList = _context.Friends.Where(x => x.UserOneId == userId && x.IsConfirmed == true).ToList();

            return Ok(friendsList);
        }
    }
}