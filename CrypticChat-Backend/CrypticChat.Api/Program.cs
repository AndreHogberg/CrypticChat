using System.Text;
using CrypticChat.Api.Hubs;
using CrypticChat.Api.Services;
using CrypticChat.Application.Services;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
var dbString = Environment.GetEnvironmentVariable("CRYPTIC_DB");
if (dbString is not null)
{
    builder.Services.AddDbContext<DataContext>(opt => opt.UseNpgsql(dbString));
}
else
{
    builder.Services.AddDbContext<DataContext>(opt => opt.UseNpgsql("User ID=postgres;Password=postgres;Host=localhost;port=5432;Database=postgres"));
}

builder.Services.AddScoped<IKeyService, KeyService>();

builder.Services.AddIdentityCore<AppUser>()
    .AddEntityFrameworkStores<DataContext>()
    .AddSignInManager<SignInManager<AppUser>>();

builder.Services.AddScoped<TokenService>();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["SecretToken"]));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseEndpoints(e => e.MapHub<ChatHub>("/connect"));
app.Run();