import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Users from '../components/Users';
import Skins from '../components/Skins';
import Games from '../components/Games';
import Tournaments from '../components/Tournaments';
import Transactions from '../components/Transactions';
import styles from '../components/style.module.css';

const Admin = () => {
  const [selectedSection, setSelectedSection] = useState('users');

  const renderSection = () => {
    switch (selectedSection) {
      case 'users':
        return <Users />;
      case 'skins':
        return <Skins />;
      case 'games':
        return <Games />;
      case 'tournaments':
        return <Tournaments />;
      case 'transactions':
        return <Transactions />;
      default:
        return <Users />;
    }
  };

  return (
    <div>
        <style>
    {`
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(to right, #2c3e50, #3498db);
        color: white;
      }
    `}
    </style>
    <div className={styles.container}>
      <Navbar setSelectedSection={setSelectedSection} />
      <div>{renderSection()}</div>
    </div>
    </div>  
  );
};

export default Admin;
