import React, { useEffect, useState, useRef } from 'react';
import { getAllUsers, deleteUser, insertUser, updateMoney, updateAdminStatus } from '../services/userService';
import styles from './Users.module.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as faceapi from 'face-api.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [moneyUpdate, setMoneyUpdate] = useState({ userId: '', updatedMoney: '' });
  const [adminUpdate, setAdminUpdate] = useState({ userId: '', isAdmin: false });
  const videoRef = useRef();
  const [isFaceApiLoaded, setIsFaceApiLoaded] = useState(false);
  const [knownDescriptor, setKnownDescriptor] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const loadModelsAndDescriptor = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
        const img = await faceapi.fetchImage('/images/eu.jpg');
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        if (detections) {
          setKnownDescriptor(detections.descriptor);
        } else {
          throw new Error('Could not detect face in reference image');
        }
        setIsFaceApiLoaded(true);
      } catch (err) {
        console.error('Error loading models or reference image:', err);
      }
    };

    loadModelsAndDescriptor();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      })
      .catch(err => {
        console.error('Error accessing webcam:', err);
      });
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const handleUpdateAdminStatus = async (e) => {
    e.preventDefault();

    if (!isFaceApiLoaded || !knownDescriptor) {
      alert('Face recognition models are not loaded.');
      return;
    }

    const video = videoRef.current;
    const detections = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
    if (detections) {
      const distance = faceapi.euclideanDistance(detections.descriptor, knownDescriptor);
      if (distance < 0.6) { 
        try {
          await updateAdminStatus(adminUpdate.userId, adminUpdate.isAdmin);
          setAdminUpdate({ userId: '', isAdmin: false });
          const usersData = await getAllUsers();
          setUsers(usersData);
        } catch (error) {
          setError('Failed to update admin status');
        }
      } else {
        alert('Face does not match the reference image.');
      }
    } else {
      alert('No face detected.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await insertUser(newUser.username, newUser.password);
      setNewUser({ username: '', password: '' });
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      setError('Failed to add user');
    }
  };

  const handleUpdateMoney = async (e) => {
    e.preventDefault();
    try {
      await updateMoney(moneyUpdate.userId, parseFloat(moneyUpdate.updatedMoney));
      setMoneyUpdate({ userId: '', updatedMoney: '' });
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      setError('Failed to update money');
    }
  };

  const handleCheckboxChange = (e) => {
    setAdminUpdate({ ...adminUpdate, isAdmin: e.target.checked });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Username", "Is Admin", "Money"];
    const tableRows = [];

    users.forEach(user => {
      const userData = [
        user.id,
        user.username,
        user.isAdmin ? 'Yes' : 'No',
        user.money
      ];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("User List", 14, 15);
    doc.save("user_list.pdf");
  };

  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>Gestionare Utilizatori</h1>
      {error && <p className={styles.error}>{error}</p>}

      <form onSubmit={handleAddUser} className={styles.form}>
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      <form onSubmit={handleUpdateMoney} className={styles.form}>
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="User ID"
            value={moneyUpdate.userId}
            onChange={(e) => setMoneyUpdate({ ...moneyUpdate, userId: e.target.value })}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="Money"
            value={moneyUpdate.updatedMoney}
            onChange={(e) => setMoneyUpdate({ ...moneyUpdate, updatedMoney: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update Money</button>
      </form>

      <ul className={styles['user-list']}>
        {users.map(user => (
          <li key={user.id} className={styles['user-item']}>
            <span>ID: {user.id} - {user.username} (Admin: {user.isAdmin ? 'Yes' : 'No'}) - Money: ${user.money}</span>
            <button onClick={() => handleDelete(user.id)} className={styles['delete-button']}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleUpdateAdminStatus} className={styles.form}>
        <div className={styles['form-group']}>
          <input
            type="text"
            placeholder="User ID"
            value={adminUpdate.userId}
            onChange={(e) => setAdminUpdate({ ...adminUpdate, userId: e.target.value })}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>
            <input
              type="checkbox"
              checked={adminUpdate.isAdmin}
              onChange={handleCheckboxChange}
            />
            Is Admin
          </label>
        </div>
        <button type="submit">Update Admin Status</button>
      </form>

      {isCameraOn ? (
        <button onClick={stopVideo} className={styles['camera-button']}>Stop Camera</button>
      ) : (
        <button onClick={startVideo} className={styles['camera-button']}>Start Camera</button>
      )}

      <video ref={videoRef} width="720" height="560" autoPlay muted className={styles.video}></video>

      <button onClick={handleDownloadPDF} className={styles['download-button']}>Download User List as PDF</button>
    </div>
  );
};

export default Users;
