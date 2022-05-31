namespace CrypticChat.Domain;

public class PublicKey
{
    public Guid KeyId { get; set; }
    public Guid UserId { get; set; }
    public byte[] Value { get; set; }
    
    public AppUser User { get; set; }
}