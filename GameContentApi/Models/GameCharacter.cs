using System;
using System.ComponentModel.DataAnnotations;

namespace GameContentApi.Models
{
  public class GameCharacter
  {
    public int Id { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }

    public string Rarity { get; set; }

    public int UpgradeLevels { get; set; } = 1;

    public int SortOrder { get; set; }

    public string ImageUrl { get; set; }
  }
}