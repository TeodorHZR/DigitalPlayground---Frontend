import React, { useEffect, useState } from 'react';
import { getAllSkins, deleteSkin, createSkin } from '../services/skinService';
import styles from './skins.module.css';

const Skins = () => {
  const [skins, setSkins] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [newSkin, setNewSkin] = useState({
    name: '',
    description: '',
    userId: '',
    imagePath: '',
    isForSale: false,
    price: '',
    gameId: ''
  });

  useEffect(() => {
    fetchSkins();
  }, [pageNumber, pageSize]);

  const fetchSkins = async () => {
    try {
      const data = await getAllSkins(pageNumber, pageSize);
      setSkins(data);
    } catch (error) {
      console.error('Error fetching skins:', error);
    }
  };

  const handleDelete = async (skinId) => {
    try {
      await deleteSkin(skinId);
      fetchSkins(); 
    } catch (error) {
      console.error('Error deleting skin:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "imagePath" && files.length > 0) {
      const filePath = `/images/${files[0].name}`;
      console.log("Selected file path: ", filePath); 
      setNewSkin({
        ...newSkin,
        [name]: filePath
      });
    } else {
      setNewSkin({
        ...newSkin,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting new skin: ", newSkin); 
    try {
      await createSkin(newSkin);
      fetchSkins(); 
      setNewSkin({
        name: '',
        description: '',
        userId: '',
        imagePath: '',
        isForSale: false,
        price: '',
        gameId: ''
      });
    } catch (error) {
      console.error('Error creating skin:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Skin List</h1>
      <ul className={styles.skinList}>
        {skins.map(skin => (
          <li key={skin.id} className={styles.skinItem}>
            <img src={skin.imagePath} alt={skin.name} className={styles.skinImage} />
            <div className={styles.skinDetails}>
              <h2 className={styles.skinName}>{skin.name}</h2>
              <p className={styles.skinDescription}>{skin.description}</p>
              <p className={styles.skinPrice}>Pret: {skin.price}</p>
            </div>
            <button onClick={() => handleDelete(skin.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
      <div className={styles.paginationButtons}>
        <button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))} className={styles.paginationButton}>Previous</button>
        <button onClick={() => setPageNumber(prev => prev + 1)} className={styles.paginationButton}>Next</button>
      </div>
      <h2 className={styles.formTitle}>Create New Skin</h2>
      <form onSubmit={handleSubmit} className={styles.skinForm}>
        <input
          type="text"
          name="name"
          value={newSkin.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className={styles.formInput}
        />
        <input
          type="text"
          name="description"
          value={newSkin.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className={styles.formInput}
        />
        <input
          type="text"
          name="userId"
          value={newSkin.userId}
          onChange={handleInputChange}
          placeholder="User ID"
          required
          className={styles.formInput}
        />
        <input
          type="file"
          name="imagePath"
          onChange={handleInputChange}
          className={styles.formInput}
          required
        />
        <label className={styles.formLabel}>
          For Sale:
          <input
            type="checkbox"
            name="isForSale"
            checked={newSkin.isForSale}
            onChange={handleInputChange}
            className={styles.formCheckbox}
          />
        </label>
        <input
          type="number"
          name="price"
          value={newSkin.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className={styles.formInput}
        />
        <input
          type="text"
          name="gameId"
          value={newSkin.gameId}
          onChange={handleInputChange}
          placeholder="Game ID"
          required
          className={styles.formInput}
        />
        <button type="submit" className={styles.submitButton}>Create</button>
      </form>
    </div>
  );
};

export default Skins;
