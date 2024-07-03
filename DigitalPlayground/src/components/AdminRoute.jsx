import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const AdminRoute = ({ children }) => {
  const isAdminCookie = Cookies.get('isAdmin');
  let isAdmin = false;

  if (isAdminCookie) {
    const bytes = CryptoJS.AES.decrypt(isAdminCookie, 'secret-key');
    isAdmin = bytes.toString(CryptoJS.enc.Utf8) === 'true';
  }

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
