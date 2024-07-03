import React, { useEffect, useState } from 'react';
import { getAllGames, deleteGame, updateGame, insertGame } from '../services/gameService';
import { getCategories, deleteCategory, insertCategory } from '../services/categoryService';
import Modal from '../components/Modal';
import AddGameForm from '../components/AddGameForm';
import StarRatingDisplay from '../components/StarRatingDisplay';
import styles from './style.module.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(7);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  const fetchGames = async () => {
    try {
      const data = await getAllGames(offset, limit, sortOrder);
      setGames(data);
      setLoading(false);
    } catch (error) {
      console.error("Eroare la obținerea jocurilor:", error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories(0, 100, 'asc'); 
      setCategories(data);
    } catch (error) {
      console.error("Eroare la obținerea categoriilor:", error);
    }
  };

  useEffect(() => {
    fetchGames();
    fetchCategories();
  }, [offset, limit, sortOrder]);

  const handleDeleteGame = async (id) => {
    try {
      await deleteGame(id);
      setGames(games.filter(game => game.id !== id));
    } catch (error) {
      console.error("Eroare la ștergerea jocului:", error);
    }
  };

  const handleUpdateGame = (game) => {
    setSelectedGame(game);
  };

  const handleSaveGame = async (updatedGame) => {
    try {
      await updateGame(updatedGame.id, updatedGame);
      setGames(games.map(game => game.id === updatedGame.id ? updatedGame : game));
      setSelectedGame(null);
    } catch (error) {
      console.error("Eroare la actualizarea jocului:", error);
    }
  };

  const handleAddGame = async (newGame) => {
    try {
      const gameId = await insertGame(newGame);
      setGames([...games, { ...newGame, id: gameId }]);
    } catch (error) {
      console.error("Eroare la adăugarea jocului:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error("Eroare la ștergerea categoriei:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const categoryId = await insertCategory(newCategoryName);
      setCategories([...categories, { id: categoryId, name: newCategoryName }]);
      setNewCategoryName("");
      fetchCategories(); 
    } catch (error) {
      console.error("Eroare la adăugarea categoriei:", error);
    }
  };

  const closeModal = () => {
    setSelectedGame(null);
  };

  const nextPage = () => setOffset(offset + limit);
  const prevPage = () => setOffset(Math.max(0, offset - limit));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Gestionare Jocuri</h1>
      {games.map((game) => (
        <div key={game.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h2>{game.name}</h2>
          <p>{game.description}</p>
          <p>Preț: {game.price}$</p>
          <StarRatingDisplay rating={game.rating} />
          <button onClick={() => handleDeleteGame(game.id)}>Delete</button>
          <button onClick={() => handleUpdateGame(game)}>Update</button>
        </div>
      ))}
      <div>
        <button onClick={prevPage} disabled={offset === 0}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
      {selectedGame && (
        <Modal 
          game={selectedGame} 
          onSave={handleSaveGame} 
          onClose={closeModal}
        />
      )}
      <AddGameForm onAdd={handleAddGame} />
      
      <h2>Categorii</h2>
      {categories.map((category) => (
        <div key={category.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{category.name}</span>
          <button style={{ marginLeft: 'auto' }} onClick={() => handleDeleteCategory(category.id)}>Delete</button>
        </div>
      ))}
      <div>
        <input 
          type="text" 
          value={newCategoryName} 
          onChange={(e) => setNewCategoryName(e.target.value)} 
          placeholder="Nume categorie"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
    </div>
  );
};

export default Games;
