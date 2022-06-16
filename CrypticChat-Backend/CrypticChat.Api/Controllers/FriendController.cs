using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using CrypticChat.Application.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace CrypticChat.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/friend/")]
    public class FriendController : Controller
    {
        private readonly DataContext _context;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IHubContext<FriendHub> _friendContext;
        private readonly UserManager<AppUser> _userManager;


        public FriendController(DataContext context, SignInManager<AppUser> signInManager, IHubContext<FriendHub> friendContext, UserManager<AppUser> userManager)
        {
            _context = context;
            _signInManager = signInManager;
            _friendContext = friendContext;
            _userManager = userManager;
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

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                var sender = await _userManager.FindByIdAsync(userClaim.Value);
                await _friendContext.Clients.User(friendrequest.Id).SendAsync("recieveFriendRequest", sender.UserName);
            }
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
        public async Task<IActionResult> AnswerRequest([FromBody]RequestAnswer answer)
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userClaim is null)
            {
                return Unauthorized();
            }
            var userId = userClaim.Value;
            
            if (answer.FriendId is null) return BadRequest("");
            var friendRequest = await _context.Friends.Include(x => x.UserOne).Include(x => x.UserTwo).SingleOrDefaultAsync(fq => fq.Id == Guid.Parse(answer.FriendId));
            if (friendRequest is null)
            {
                return BadRequest("No pending friend request");
            }
            if (answer.Answer == false)
            {
                _context.Friends.Remove(friendRequest);
            }
            else
            {
                friendRequest.IsConfirmed = true;
                if (friendRequest.UserOneId == userId)
                {
                    await _friendContext.Clients.User(friendRequest.UserTwoId)
                        .SendAsync("acceptFriend", friendRequest.UserOne.UserName, friendRequest.Id, friendRequest.UserOne.Email);
                    
                    return Ok(new FriendDto{Email = friendRequest.UserTwo.Email, 
                        Username = friendRequest.UserTwo.UserName, 
                        FriendId = friendRequest.Id.ToString()});
                }
                await _friendContext.Clients.User(friendRequest.UserOneId)
                        .SendAsync("acceptFriend", friendRequest.UserTwo.UserName, friendRequest.Id, friendRequest.UserTwo.Email);
                    return Ok(new FriendDto
                    {
                        Email = friendRequest.UserOne.Email,
                        Username = friendRequest.UserOne.UserName,
                        FriendId = friendRequest.Id.ToString()
                    });
            }

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetFriends()
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userClaim is null)
            {
                return Unauthorized();
            }
            var userId = userClaim.Value;
            var friendsList = await _context.Friends.Where(x => (x.UserOneId == userId || x.UserTwoId == userId) && x.IsConfirmed == true).Include(x => x.UserOne).Include(x => x.UserTwo).ToListAsync();
        
            return Ok(await MaptoFriendDto(friendsList, userId));
        }

        [HttpGet("search/{email}")]
        public async Task<IActionResult> SearchFriends([FromRoute] string email)
        {
            var userClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userClaim is null)
            {
                return Unauthorized();
            }
            var userId = userClaim.Value;
            var searchEmail = await _signInManager.UserManager.Users.Where(x => x.NormalizedEmail.Contains(email.ToUpper())).ToListAsync();
            
            if (searchEmail.Count == 0) return BadRequest("Could not find anyone with that email!");

            List<FriendDto> friends = new List<FriendDto>();
            var pendingRequests = await _context.Friends.Where(x => (x.UserOneId == userId || x.UserTwoId == userId) && x.IsConfirmed == false).ToListAsync();
            
            foreach (var friend in searchEmail)
            {
                if (pendingRequests.Any(pending => pending.UserOneId == friend.Id || pending.UserTwoId == friend.Id))
                {
                    continue;
                }
                friends.Add(new FriendDto
                {
                    Email = friend.Email,
                    Username = friend.UserName
                });
            }

            return Ok(friends);
        }
        
        private async Task<List<FriendDto>> MaptoFriendDto(List<Friend> friends, string userId)
        {
            var friendDtos = new List<FriendDto>();
            foreach (var friend in friends)
            {
                if (friend.UserOneId == userId)
                {
                    friendDtos.Add(new ()
                    {
                        FriendId = friend.Id.ToString(),
                        Username = friend.UserTwo.UserName
                    });
                }
                else
                {
                    friendDtos.Add(new ()
                    {
                        FriendId = friend.Id.ToString(),
                        Username = friend.UserOne.UserName
                    });
                }
            }

            return friendDtos;
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