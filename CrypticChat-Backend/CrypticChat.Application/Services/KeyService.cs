using CrypticChat.Application.dtos;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.EntityFrameworkCore;

namespace CrypticChat.Application.Services;


public class KeyService : IKeyService
{
    private readonly DataContext _dataContext;

    public KeyService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> InsertKey(KeyDto keyDto, Guid userId)
    {
        var key = await _dataContext.Keys.FirstOrDefaultAsync(x => x.UserId == userId);
        if (key is not null)
        {
            key.Value = keyDto.Value;
            _dataContext.Keys.Update(key);
        }
        else
        {
            _dataContext.Keys.Add(new PublicKey()
            {
                KeyId = Guid.NewGuid(),
                UserId = userId,
                Value = keyDto.Value
            });
        }
        return await _dataContext.SaveChangesAsync() > 0;
    }

    public async Task<KeyDto> GetKey(Guid friendId)
    {
        var key = await _dataContext.Keys.SingleOrDefaultAsync(x => x.UserId == friendId);
        if (key is not null)
        {
            return new KeyDto
            {
                Value = key.Value
            };
        }

        return null;
    }
}