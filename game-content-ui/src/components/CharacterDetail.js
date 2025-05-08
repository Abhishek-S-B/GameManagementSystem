import { useState, useEffect } from 'react';
import './CharacterDetail.css';

export default function CharacterDetail({ character, open, onClose, userRole, onCharacterUpdated }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    rarity: "Common",
    upgradeLevels: 1,
    imageUrl: null
  });

  useEffect(() => {
    if (character) {
      setFormData({
        id: character.id,
        name: character.name || "",
        description: character.description || "",
        rarity: character.rarity || "Common",
        upgradeLevels: character.upgradeLevels || 1,
        imageUrl: character.imageUrl || ""
      });
    }
  }, [character]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:5062/api/gamecharacters/${character.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedCharacter = await response.json();
      onCharacterUpdated(updatedCharacter);
      setEditMode(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:5062/api/gamecharacters/${character.id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setConfirmOpen(false);
      onClose();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{editMode ? 'Edit Character' : formData?.name}</h2>
          {!editMode && userRole && ['Admin', 'Writer'].includes(userRole) && (
            <div className="action-buttons">
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => setConfirmOpen(true)}>
                Delete
              </button>
            </div>
          )}
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {editMode ? (
            <form className="character-form">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </label>

              <label>
                Rarity:
                <select
                  name="rarity"
                  value={formData.rarity}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Common">Common</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                </select>
              </label>

              <label>
                Upgrade Levels (1-5):
                <input
                  type="number"
                  name="upgradeLevels"
                  min="1"
                  max="5"
                  value={formData.upgradeLevels}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Image URL:
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </label>
            </form>
          ) : (
            <div className="character-view">
              <img
                src={formData.imageUrl}
                alt={formData.name}
                className="character-image"
              />
              <div className={`rarity-badge rarity-${formData.rarity.toLowerCase()}`}>
                {formData.rarity}
              </div>
              <p className="description">
                {formData.description || 'No description available'}
              </p>
              <div className="stars">
                {'★'.repeat(formData.upgradeLevels)}
              </div>
            </div>
          )}
        </div>

        {editMode && (
          <div className="modal-footer">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {confirmOpen && (
        <div className="confirm-dialog">
          <div className="confirm-content">
            <h3>Delete Character?</h3>
            <p>Are you sure you want to delete "{character?.name}"?</p>
            <div className="confirm-buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-delete-btn"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}