namespace CrypticChat.Domain;

public class Message
{
    public Guid Id { get; set; }
    public string SenderId { get; set; }
    public Guid ChatRoomId { get; set; }
    public string Text { get; set; }
    public DateTime SentAt { get; set; }
    
    public AppUser Sender { get; set; }
    public ChatRoom ChatRoom { get; set; }
}