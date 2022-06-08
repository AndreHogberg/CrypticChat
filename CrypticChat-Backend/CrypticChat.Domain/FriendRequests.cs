namespace CrypticChat.Domain;

public class FriendRequests
{
    public Guid Id { get; set; }
    public string SenderId { get; set; }
    public string RecieverId { get; set; }
    
    public AppUser Sender { get; set; }
    public AppUser Reciever { get; set; }
}