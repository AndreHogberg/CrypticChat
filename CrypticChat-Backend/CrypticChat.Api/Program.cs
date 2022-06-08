using System.Text;
using CrypticChat.Api.Services;
using CrypticChat.Application.Hubs;
using CrypticChat.Application.Services;
using CrypticChat.Domain;
using CrypticChat.Persistance;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});

builder.Services.AddSignalR();

builder.Services.AddControllers();
var dbString = Environment.GetEnvironmentVariable("CRYPTIC_DB");
if (dbString is not null)
{
    builder.Services.AddDbContext<DataContext>(opt => opt.UseNpgsql(dbString));
}
else
{
    builder.Services.AddDbContext<DataContext>(opt => opt.UseNpgsql("User ID=postgres;Password=Admin1337;Host=localhost;port=5432;Database=postgres"));
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

        opt.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) &&
                    (path.StartsWithSegments("/hubs/chat") || path.StartsWithSegments("/hubs/friend")))
                {
                    // Read the token out of the query string
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetService<DataContext>();
    context.Database.Migrate();
}

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/hubs/chat");

app.Run();