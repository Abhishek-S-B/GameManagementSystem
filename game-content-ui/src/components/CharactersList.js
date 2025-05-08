import React, { useState, useEffect } from 'react';
import CharacterDetail from './CharacterDetail';
import './CharactersList.css';

function CharactersList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCharacters = async (term = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5062/api/GameCharacters/search?searchTerm=${term}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCharacters(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching characters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterUpdated = (updatedCharacter) => {
    setCharacters(prev => prev.map(c =>
      c.id === updatedCharacter.id ? updatedCharacter : c
    ));
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className="characters-container">
      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              fetchCharacters(e.target.value);
            }}
          />
        </div>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      <h1 className="page-title">Game Characters</h1>

      <div className="characters-grid">
        {characters.map(character => (
          <div
            key={character.id}
            className="character-card"
            onClick={() => setSelectedCharacter(character)}
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className="character-homeimage"
            />
            <div className="character-content">
              <h3>{character.name}</h3>
              <span className={`rarity-badge ${character.rarity.toLowerCase()}`}>
                {character.rarity}
              </span>
              <p className="description">
                {character.description}
              </p>
              <div className="stars">
                {'★'.repeat(character.upgradeLevels)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CharacterDetail
        character={selectedCharacter}
        open={Boolean(selectedCharacter)}
        onClose={() => setSelectedCharacter(null)}
        userRole="Writer"
        onCharacterUpdated={handleCharacterUpdated}
      />
    </div>
  );
}

export default CharactersList;