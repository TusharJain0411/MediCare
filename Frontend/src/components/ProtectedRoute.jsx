import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyUserToken } from "../services/userAuth";
import "../CSS/adminProfile.css";

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
    return (
      <div className="loader-container-main h-100 ">
        <div className="loader-content">
          <button className="btn bg-transparent p-1 m-0" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              style={{ backgroundColor: "#22C55E" }}
            ></span>
          </button>

          <button className="btn bg-transparent p-1 m-0" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              style={{ backgroundColor: "#22C55E" }}
            ></span>
          </button>

          <button className="btn bg-transparent p-1 m-0" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              style={{ backgroundColor: "#22C55E" }}
            ></span>
          </button>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  return  children
};

export default ProtectedRoute;
