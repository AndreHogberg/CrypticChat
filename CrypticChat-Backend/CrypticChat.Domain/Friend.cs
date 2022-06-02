namespace CrypticChat.Domain;

public class Friend
{
    public Guid Id { get; set; }
    public string UserOneId { get; set; }
    public string UserTwoId { get; set; }
    
    
    public AppUser UserOne { get; set; }
    public AppUser UserTwo { get; set; }
}