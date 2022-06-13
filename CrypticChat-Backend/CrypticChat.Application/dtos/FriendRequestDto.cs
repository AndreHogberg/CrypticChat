namespace CrypticChat.Application.dtos;

public class FriendRequestDto
{
    public Guid FriendId { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
}