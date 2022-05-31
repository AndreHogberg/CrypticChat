using System.ComponentModel.DataAnnotations;

namespace CrypticChat.Domain;

public class PublicKey
{
    
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public byte[] Value { get; set; }
    
    public AppUser User { get; set; }
}