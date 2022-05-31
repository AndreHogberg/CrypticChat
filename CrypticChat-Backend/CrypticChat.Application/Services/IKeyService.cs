using CrypticChat.Application.dtos;

namespace CrypticChat.Application.Services;

public interface IKeyService
{
    Task<bool> InsertKey(KeyDto keyDto, Guid userId);
    Task<KeyDto> GetKey(Guid friendId);
}
