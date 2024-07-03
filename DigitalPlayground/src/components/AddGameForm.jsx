import React, { useState } from 'react';
import styles from './style.module.css';

const AddGameForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 5) {
      alert("Rating-ul nu poate fi mai mare de 5");
      return;
    }
    onAdd({ name, description, price, rating });
    setName('');
    setDescription('');
    setPrice('');
    setRating('');
  };

  return (
    <div className={styles.addGameForm}>
      <h2>Adaugă un nou joc</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nume:</label>
        <input 
          id="name" 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required
        />
        <label htmlFor="description">Descriere:</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required
        />
        <label htmlFor="price">Preț:</label>
        <input 
          id="price" 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required
        />
        <label htmlFor="rating">Rating:</label>
        <input 
          id="rating" 
          type="number" 
          value={rating} 
          onChange={(e) => setRating(e.target.value)} 
          required
        />
        <button type="submit">Add Game</button>
      </form>
    </div>
  );
};

export default AddGameForm;
