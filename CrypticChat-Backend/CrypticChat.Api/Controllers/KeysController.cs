using System.Security.Claims;
using CrypticChat.Application.dtos;
using CrypticChat.Application.Services;
using CrypticChat.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CrypticChat.Api.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class KeysController : ControllerBase
{
    private readonly IKeyService _keyService;
    private readonly UserManager<AppUser> _userManager;

    public KeysController(IKeyService keyService, UserManager<AppUser> userManager)
    {
        _keyService = keyService;
        _userManager = userManager;
    }
    [HttpPost("insertKey")]
    public async Task<IActionResult> InsertPublicKey(KeyDto keyDto)
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        if (user is null)
        {
            return Unauthorized();
        }
        var result = await _keyService.InsertKey(keyDto, Guid.Parse(user.Id));

        if (result)
        {
            return Ok();
        }

        return BadRequest("Something went wrong inserting the key");
    }

    [HttpGet("getKey")]
    public async Task<ActionResult<KeyDto>> FindPublicKey(Guid friendId)
    {
        var result = await _keyService.GetKey(friendId);

        if (result is null)
        {
            return BadRequest();
        }

        return Ok(result);
    }
}