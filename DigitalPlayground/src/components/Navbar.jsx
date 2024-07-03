import React from 'react';
import styles from './style.module.css';

const Navbar = ({ setSelectedSection }) => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li onClick={() => setSelectedSection('users')}>Users</li>
        <li onClick={() => setSelectedSection('skins')}>Skins</li>
        <li onClick={() => setSelectedSection('games')}>Games</li>
        <li onClick={() => setSelectedSection('tournaments')}>Tournaments</li>
        <li onClick={() => setSelectedSection('transactions')}>Transactions</li>
      </ul>
    </div>
  );
};

export default Navbar;
