import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUserToken } from "../services/userAuth";


const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {
  const verify = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      setLoading(false);
      return;
    }

    try {
      await verifyUserToken(token);
      setIsValid(true);
    } catch {
      localStorage.removeItem("token");
      setIsValid(false);
    }

    setLoading(false);
  };

  verify();
}, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return  children
};

export default ProtectedRoute;
