using CrypticChat.Application.dtos;

namespace CrypticChat.Application.Services;

public interface IKeyService
{
    Task<bool> InsertKey(KeyDto keyDto, string userId);
    Task<KeyDto> GetKey(string friendId);
}
