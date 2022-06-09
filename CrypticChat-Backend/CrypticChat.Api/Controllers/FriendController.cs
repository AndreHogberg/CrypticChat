using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace CrypticChat.Api.Controllers
{
    [Authorize]
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
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userClaim is null)
            {
                return Unauthorized();
            }
            var userId = userClaim.Value;
            var friendrequest = await FindUserAsync(email);
            if (friendrequest is null)
            {
                return BadRequest("Found no user with that specific email");
            }
            _context.Friends.Add(new Friend
            {
                UserOneId = userId,
                UserTwoId = friendrequest.Id,
                ChatRoomId = new Guid().ToString(),
                IsConfirmed = false
            });

            await _context.SaveChangesAsync();
            return Ok(friendrequest);
        }
        [HttpPost("request")]
        public async Task<IActionResult> AnswerRequest(RequestAnswer answer)
        {
            if (answer.Answer == false)
            {
               var friendRequest =  _context.Friends.FirstOrDefault(x => x.UserOneId == answer.UserOneId &&
                                                     x.UserTwoId == answer.UserTwoId);
               if (friendRequest is null)
               {
                   return BadRequest("No pending friend request");
               }
               _context.Friends.Remove(friendRequest);
            }
            else
            {
                var friendRequest = _context.Friends.FirstOrDefault(x => x.UserOneId == answer.UserOneId &&
                                                                         x.UserTwoId == answer.UserTwoId);
                if (friendRequest is null)
                {
                    return BadRequest("No pending friend request");
                }
                friendRequest.IsConfirmed = true;
            }

            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("friends")]
        public async Task<IActionResult> GetFriends(string userId)
        {
            var friendsList = await _context.Friends.Where(x => x.UserOneId == userId && x.IsConfirmed == true).ToListAsync();

            return Ok(friendsList);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchFriends(string name)
        {
            var searchEmail = await _signInManager.UserManager.Users.Where(x => x.Email.Contains(name)).ToListAsync();

            if (searchEmail.Count == 0) return BadRequest("Could not find anyone with that email!");

            return Ok(searchEmail);
        }

        private async Task<AppUser> FindUserAsync(string email)
        {
            return await _signInManager.UserManager.Users.FirstOrDefaultAsync(x => x.Email.Contains(email));
        }
    }
}