using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CrypticChat.Api.Controllers
{
    [ApiController]
    [Route("/api/user/")]
    public class FriendController : Controller
    {
        private readonly DataContext _context;
        private readonly SignInManager<AppUser> _signInManager;

        public FriendController(DataContext context, SignInManager<AppUser> signInManager)
        {
            _context = context;
            _signInManager = signInManager;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFriend(string email)
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

        public async Task<IActionResult> SearchFriends(string name)
        {
            var searchEmail = _signInManager.UserManager.Users.Where(x => x.Email.Contains(name)).ToList();

            if (searchEmail != null) return BadRequest("Could not find anyone with that email!");

            return Ok(searchEmail);
        }

        internal string FindUser(string email)
        {
            var user = _signInManager.UserManager.Users.Where(_x => _x.Email.Contains(email)).FirstOrDefault();

            if (user != null) return user.Id;

            return null;
        }
    }
}