import React from 'react';
import styles from './modaltournaments.module.css'; 

const ModalTournaments = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default ModalTournaments;
