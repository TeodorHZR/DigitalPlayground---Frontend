import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [location]);  

  if (!token) {
    return null;
  }

  return children;
};

export default PrivateRoute;
