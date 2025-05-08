using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using GameContentApi.Models;

public class GameContentDbContext : IdentityDbContext<IdentityUser>
{
  public GameContentDbContext(DbContextOptions<GameContentDbContext> options)
      : base(options) { }
  public DbSet<GameCharacter> GameCharacters { get; set; }
}