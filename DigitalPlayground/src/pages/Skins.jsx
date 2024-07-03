import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBBtn } from 'mdb-react-ui-kit';
import styled from 'styled-components';
import { getAllGames } from "../services/gameService";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { getAvailableForGame, updateUserForSkin, getSkinsByMaxPrice, getSkinsOrderedByPrice } from "../services/skinService";
import { BiCart } from 'react-icons/bi';
import {createSkinTransaction} from '../services/transactionService'
import { updateMoney } from "../services/userService";

const Skins = () => {
  const [money, setMoney] = useState(parseFloat(localStorage.getItem('money')) || 0);
  const [games, setGames] = useState([]);
  const [skins, setSkins] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const userId = localStorage.getItem('userId'); 

  const StyledButton = styled(MDBBtn)`
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 5px;
    width: 120px;
    height: 40px;
    margin-right: 10px;
    box-shadow: 0 5px #999;
    transition: transform 0.3s ease-out;

    &:active {
      transform: translateY(4px);
      box-shadow: 0 1px #666;
    }
  `;

  const handleGameChange = async (gameId) => {
    setSelectedGameId(gameId);
    const skinsData = await getAvailableForGame(gameId, userId); 
    setSkins(skinsData);
  };

  const handlePurchase = async (skin) => {
    if (skin.price <= money) {
      const updatedMoney = money - skin.price;

      try {
        const skinTransaction = {
          userId: userId,
          amount: skin.price,
          skinId: skin.id,
          date: new Date().toISOString()
        };
        await createSkinTransaction(skinTransaction);
        await updateMoney(userId, updatedMoney);
        await updateUserForSkin(skin.id, userId);
        localStorage.setItem('money', updatedMoney);
        setMoney(updatedMoney);
        alert("Tranzactie reusita!");
        window.location.reload();
      } catch (error) {
        console.error("Eroare la efectuarea tranzactiei:", error);
      }
    } else {
      alert("Fonduri insuficiente!");
    }
  };

  const handleFilter = async () => {
    if (maxPrice) {
      const filteredSkins = await getSkinsByMaxPrice(parseFloat(maxPrice), selectedGameId, userId);
      setSkins(filteredSkins);
    } else {
      const sortedSkins = await getSkinsOrderedByPrice(sortOrder === 'asc', selectedGameId, userId);
      setSkins(sortedSkins);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllGames(0, 100, 'asc');
        setGames(data);
      } catch (error) {
        console.error("Eroare la obtinerea jocurilor:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <style>
        {`
        body {
          background-image: url('https://www.veeforu.com/wp-content/uploads/2023/10/Green-arrow-gaming-background-free-download.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          color: white;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #4A2E0F;
          color: #fff;
          margin-left: -11.8%;
          width: 113.3%;
        }
        .container {
          max-width: 100%;
        }
        .dropdown-menu {
            background-color: #fff; 
            color: #000; 
        }
        .skins-list {
          margin-top: 20px;
        }
        .skin-item {
          border-bottom: 1px solid #ccc; 
          padding: 20px; 
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .skin-image {
          max-width: 200px; 
          height: auto; 
          border: 2px solid #fff; 
          border-radius: 5px; 
          margin-bottom: 10px; 
        }
        .filter-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }
        .filter-container input {
          margin-right: 10px;
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        .filter-container select {
          margin-right: 10px;
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        `}
      </style>
      <div className="header">
        <div>
          <span>DigitalPlayground</span>
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Selecteaza joc
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {games.map(game => (
              <li key={game.id}>
                <button className="dropdown-item" onClick={() => handleGameChange(game.id)}>{game.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <i className="fas fa-coins" /> {money.toFixed(2)}$
        </div>
      </div>
      <div className="filter-container">
        <input 
          type="number" 
          placeholder="Max price" 
          value={maxPrice} 
          onChange={(e) => setMaxPrice(e.target.value)} 
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Crescator</option>
          <option value="desc">Descrescator</option>
        </select>
        <StyledButton onClick={handleFilter}>Filtreaza</StyledButton>
      </div>
      <div className="skins-list">
        <h2>Skin-uri</h2>
        <ul>
          {skins.map(skin => (
            <li key={skin.id} className="skin-item">
              <img src={skin.imagePath} alt={skin.name} className="skin-image" />
              <h3>{skin.name}</h3>
              <p>{skin.description}</p>
              <p>Pret: {skin.price}$</p>
              <BiCart size={24} onClick={() => handlePurchase(skin)} /> Cumpara acum! 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skins;
