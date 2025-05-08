using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameContentApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GameContentApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class GameCharactersController : ControllerBase
  {
    private readonly GameContentDbContext _context;

    public GameCharactersController(GameContentDbContext context)
    {
      _context = context;
    }

    // GET: api/GameCharacters
    [HttpGet]
    public async Task<ActionResult<IEnumerable<GameCharacter>>> GetGameCharacters()
    {
      return await _context.GameCharacters.ToListAsync();
    }

    // GET: api/GameCharacters/5
    [HttpGet("{id}")]
    public async Task<ActionResult<GameCharacter>> GetGameCharacter(int id)
    {
      var gameCharacter = await _context.GameCharacters.FindAsync(id);

      if (gameCharacter == null)
      {
        return NotFound();
      }

      return gameCharacter;
    }

    // POST: api/GameCharacters
    [HttpPost]
    //[Authorize(Roles = "Admin")]
    public async Task<ActionResult<GameCharacter>> PostGameCharacter([FromBody] GameCharacter gameCharacter)
    {
      _context.GameCharacters.Add(gameCharacter);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetGameCharacter", new { id = gameCharacter.Id }, gameCharacter);
    }

    [HttpGet]
    [Route("search")]
    // GET: api/GameCharacters/search?searchTerm=term
    public async Task<ActionResult<IEnumerable<GameCharacter>>> SearchCharacter(
    [FromQuery] string? searchTerm = null)
    {
      var query = _context.GameCharacters.AsQueryable();

      if (!string.IsNullOrEmpty(searchTerm))
      {
        query = query.Where(c =>
            c.Name.Contains(searchTerm) ||
            (c.Description != null && c.Description.Contains(searchTerm)));
      }

      return await query.ToListAsync();
    }

    [HttpPut("{id}")]
    //[Authorize(Roles = "Admin, Writer")]
    // PUT: api/GameCharacters/5
    public async Task<IActionResult> UpdateGameCharacter(int id, [FromBody] GameCharacter updatedCharacter)
    {
      if (id != updatedCharacter.Id)
      {
        return BadRequest("ID mismatch");
      }

      _context.Entry(updatedCharacter).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!_context.GameCharacters.Any(e => e.Id == id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return CreatedAtAction("GetGameCharacter", new { id = updatedCharacter.Id }, updatedCharacter);
    }

    [HttpDelete("{id}")]
    //[Authorize(Roles = "Writer")]
    // DELETE: api/GameCharacters/5
    public async Task<IActionResult> DeleteGameCharacter(int id)
    {
      var character = await _context.GameCharacters.FindAsync(id);
      if (character == null)
      {
        return NotFound();
      }

      _context.GameCharacters.Remove(character);
      await _context.SaveChangesAsync();

      return Content("Character deleted successfully");
    }
  }
}