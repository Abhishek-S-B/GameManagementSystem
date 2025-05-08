using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<GameContentDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddCors(options =>
    options.AddPolicy("AllowAllOrigins", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();


app.UseCors("AllowAllOrigins");
app.UseRouting();

//app.UseAuthentication();
//app.UseAuthorization();

app.MapControllers();
app.MapGet("/api/test", () => "API is working!");

app.Run();