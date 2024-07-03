import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { updatePassword } from '../services/userService'; 
import { fetchTransactions } from '../services/gameService';
import { getAllByUserId, updateIsForSale, updatePrice } from '../services/skinService';

const Account = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [balance, setBalance] = useState(localStorage.getItem('money') || '0');
  const [showPassword, setShowPassword] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [skins, setSkins] = useState([]);
  const [priceInput, setPriceInput] = useState({});

  const clientID = "AW0TYo9RpQhAwEnihiRLEeHxQ_MO1WIiWCDvM4TU640wSUjAKeckAxeSU-Eu6Xmbx7hIYksUSdRy9Sh9";

  const plans = [
    { name: '100 credits', amount: '5.00' },
    { name: '300 credits', amount: '10.00' },
    { name: '500 credits', amount: '20.00' },
  ];

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetchTransactionsData(userId, currentPage);
    fetchUserSkins(userId);
  }, [currentPage]);

  const fetchTransactionsData = async (userId, page) => {
    const offset = (page - 1) * 5;
    try {
      const response = await fetchTransactions(userId, offset, 5);
      setTransactions(response.games);
      setTotalPages(Math.ceil(response.totalCount / 5));
    } catch (error) {
      console.error("Eroare la obtinerea tranzacțiilor:", error);
    }
  };

  const fetchUserSkins = async (userId) => {
    try {
      const response = await getAllByUserId(userId);
      setSkins(response);
    } catch (error) {
      console.error("Eroare la obtinerea skin-urilor:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Parolele nu coincid.');
      return;
    }
    try {
      const userId = localStorage.getItem('userId');
      await updatePassword(userId, newPassword);
      alert('Parola a fost actualizată cu succes!');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
    } catch (error) {
      setPasswordError('Eroare la actualizarea parolei.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePriceChange = (skinId, price) => {
    setPriceInput((prev) => ({ ...prev, [skinId]: price }));
  };

  const handleUpdatePrice = async (skinId) => {
    const price = priceInput[skinId];
    priceInput[skinId]="";
    try {
      await updatePrice(skinId, price);
      alert('Prețul a fost actualizat cu succes!');
      fetchUserSkins(localStorage.getItem('userId'));
    } catch (error) {
      console.error('Eroare la actualizarea prețului:', error);
    }
  };

  const handleToggleIsForSale = async (skinId, currentStatus) => {
    try {
      await updateIsForSale(skinId, !currentStatus);
      alert('Starea de vânzare a fost actualizată cu succes!');
      fetchUserSkins(localStorage.getItem('userId'));
    } catch (error) {
      console.error('Eroare la actualizarea stării de vânzare:', error);
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            background-image: url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=1380&t=st=1717064642~exp=1717065242~hmac=8414bef29c573dc93ada63a34437892c7a0904b0ea76791e5208e6fa65b3088f');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
          .custom-input {
            display: block;
            width: 80%;
            max-width: 400px;
            padding: 0.5rem;
            margin-bottom: 1rem;
            border: 2px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
            margin-left: 0;
          }
          .input-container {
            position: relative;
            display: flex;
            align-items: center;
          }
          .eye-icon {
            cursor: pointer;
            font-size: 1.5rem;
            position: relative;
          }
          .error {
            color: red;
          }
          .transaction-card, .skin-card {
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin: 1rem 0;
            padding: 1rem;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .transaction-card:hover, .skin-card:hover {
            transform: scale(1.02);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
          }
          .transaction-list, .skin-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }
          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
          }
          .pagination button {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            margin: 0 0.25rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s;
          }
          .pagination button:hover {
            background: #0056b3;
          }
          .pagination button:disabled {
            background: #cccccc;
            cursor: not-allowed;
          }
          .section {
            margin-bottom: 2rem;
          }
          .toggle-button {
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            width: 2rem;
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1rem;
            border: none;
          }
          .toggle-button.active {
            background-color: green;
          }
          .toggle-button.inactive {
            background-color: red;
          }
        `}
      </style>
      <h1>Detalii despre contul tau</h1>

      <div className="section">
        <h2 style={{ fontFamily: 'sans-serif', marginBottom: '1rem' }}>Actualizare parola</h2>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            className="custom-input"
            placeholder="Parola noua"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            className="custom-input"
            placeholder="Confirmati parola noua"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <span className="eye-icon" onClick={toggleShowPassword}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span>
        </div>
        {passwordError && <div className="error">{passwordError}</div>}
        <button onClick={handleUpdatePassword}>Actualizare parola</button>
      </div>

      <div className="section">
        <h2>Soldul tau: {balance}$</h2>
        {plans.map((plan, index) => (
          <button key={index} onClick={() => setSelectedAmount(plan.amount)}>
            {plan.name}: ${plan.amount}
          </button>
        ))}
        {selectedAmount && (
          <PayPalScriptProvider options={{ "client-id": clientID }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: selectedAmount
                    }
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                  alert("Payment successful!");
                  console.log("Payment successful!", details);
                });
              }}
              onError={(err) => {
                console.error("Error with payment", err);
                alert("There was an error with your payment.");
              }}
              onCancel={(data) => {
                console.log("Payment cancelled", data);
                alert("Payment was cancelled.");
              }}
            />
          </PayPalScriptProvider>
        )}
      </div>

      <div className="section">
        <h2>Istoricul tranzactiilor tale</h2>
        <div className="transaction-list">
          {transactions.map((transaction, index) => (
            <div key={index} className="transaction-card">
              <h3>{transaction.name}</h3>
              <p>{transaction.description}</p>
              <p><b>Suma: </b> {transaction.amount}$</p>
              <p><b>Data: </b> {new Date(transaction.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Skin-urile tale</h2>
        <div className="skin-list">
          {skins.map((skin) => (
            <div key={skin.id} className="skin-card">
              <h3>{skin.name}</h3>
              <p><b>Preț:</b> {skin.price}$</p>
              <input
                type="number"
                className="custom-input"
                placeholder="Pret nou"
                value={priceInput[skin.id] || ''}
                onChange={(e) => handlePriceChange(skin.id, e.target.value)}
              />
              <button onClick={() => handleUpdatePrice(skin.id)}>Actualizeaza pretul</button>
              <button
                className={`toggle-button ${skin.isForSale ? 'active' : 'inactive'}`}
                onClick={() => handleToggleIsForSale(skin.id, skin.isForSale)}
              >
                {skin.isForSale ? '🟢' : '🔴'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
