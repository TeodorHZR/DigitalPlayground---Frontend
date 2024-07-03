import React, { useState, useEffect } from 'react';
import styles from './style.module.css'; 

const Modal = ({ game, onSave, onClose }) => {
  const [name, setName] = useState(game.name);
  const [description, setDescription] = useState(game.description);
  const [price, setPrice] = useState(game.price);
  const [rating, setRating] = useState(game.rating);

  useEffect(() => {
    const textarea = document.getElementById('description');
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 5) {
      alert("Rating-ul nu poate fi mai mare de 5");
      return;
    }
    onSave({ ...game, name, description, price, rating });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" style={{ color: 'black' }}>Nume:</label>
          <input 
            id="name" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className={styles.input} 
          />
          <label htmlFor="description" style={{ color: 'black' }}>Descriere:</label>
          <textarea 
            id="description" 
            value={description} 
            onChange={handleDescriptionChange}
            className={styles.textarea} 
          />
          <label htmlFor="price" style={{ color: 'black' }}>Preț:</label>
          <input 
            id="price" 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className={styles.input}
          />
          <label htmlFor="rating" style={{ color: 'black' }}>Rating:</label>
          <input 
            id="rating" 
            type="number" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            className={styles.input}
            max="5"
          />
          <button type="submit" className={styles.button}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
