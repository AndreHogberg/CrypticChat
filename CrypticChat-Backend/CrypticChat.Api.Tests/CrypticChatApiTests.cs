using System;
using CrypticChat.Api.Services;
using CrypticChat.Domain;
using Microsoft.Extensions.Configuration;
using Xunit;

namespace CrypticChat.Api.Tests;

public class CrypticChatApiTests
{
    [Fact]
    public void CreateJwtTokenForAppUser()
    {
        var tokenService = new TokenService(new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false)
            .Build());

        var result = tokenService.CreateToken(new AppUser()
        {
            UserName = "Hello",
            Email = "1@1.com",
            Id = Guid.NewGuid().ToString()
        });
        
        Assert.NotNull(result);
    }
}