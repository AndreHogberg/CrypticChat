using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CrypticChat.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/friend/")]
    public class FriendController : Controller
    {
        private readonly DataContext _context;
        private readonly SignInManager<AppUser> _signInManager;

        public FriendController(DataContext context, SignInManager<AppUser> signInManager)
        {
            _context = context;
            _signInManager = signInManager;
        }

        [HttpPost("add/{email}")]
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
                Id = Guid.NewGuid(),
                UserOneId = userId,
                UserTwoId = friendrequest.Id,
                IsConfirmed = false
            });

            await _context.SaveChangesAsync();
            return Ok(friendrequest);
        }
        [HttpGet("request")]
        public async Task<IActionResult> GetPendingRequests()
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userClaim is null)
            {
                return Unauthorized();
            }
            var userId = userClaim.Value;

            var pendingList = await _context.Friends
                .Where(user => (user.UserOne.Id == userId || user.UserTwo.Id == userId) && !user.IsConfirmed)
                .Include(x => x.UserOne)
                .Include(x => x.UserTwo)
                .ToListAsync();
            
            return Ok(await MapFriendListToDto(pendingList, userId));
        }
        [HttpPost("request")]
        public async Task<IActionResult> AnswerRequest(RequestAnswer answer)
        {
            if (answer.Answer == false)
            {
                var friendRequest = _context.Friends.FirstOrDefault(x => x.UserOneId == answer.UserOneId &&
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
            var friendsList = await _context.Friends.Where(x => (x.UserOneId == userId || x.UserTwoId == userId) && x.IsConfirmed == true).ToListAsync();

            return Ok(friendsList);
        }

        [HttpGet("search/{email}")]
        public async Task<IActionResult> SearchFriends([FromRoute] string email)
        {
            var searchEmail = await _signInManager.UserManager.Users.Where(x => x.NormalizedEmail.Contains(email.ToUpper())).ToListAsync();

            if (searchEmail.Count == 0) return BadRequest("Could not find anyone with that email!");

            List<FriendDto> friends = new List<FriendDto>();

            foreach (var friend in searchEmail)
            {
                friends.Add(new FriendDto
                {
                    Email = friend.Email,
                    Username = friend.UserName
                });
            }

            return Ok(friends);
        }

        private async Task<List<FriendRequestDto>> MapFriendListToDto(List<Friend> friends, string userid)
        {
            var friendRequestDtos = new List<FriendRequestDto>();
            foreach (var friend in friends)
            {
                if (friend.UserOneId == userid)
                {
                    friendRequestDtos.Add(new FriendRequestDto()
                    {
                        FriendId = friend.Id,
                        Email = friend.UserTwo.Email,
                        Username = friend.UserTwo.UserName
                    });
                }
                else
                {
                    friendRequestDtos.Add(new FriendRequestDto()
                    {
                        FriendId = friend.Id,
                        Email = friend.UserOne.Email,
                        Username = friend.UserOne.UserName
                    });
                }
            }

            return friendRequestDtos;
        }
        private async Task<AppUser> FindUserAsync(string email)
        {
            return await _signInManager.UserManager.Users.FirstOrDefaultAsync(x => x.Email.Contains(email));
        }
    }
}