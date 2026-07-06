import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';
function Login_Register() {

const [transfer,setTransfer]=useState(false);

const SwitchtoRegister=()=>{
  setTransfer(true);
}

const SwitchtoLogin = () => {
  setTransfer(false);
};


  return (
    <>
      <div className={transfer ? "LR-background-R" : "LR-background"}>
        <div className="Left-LR-container">
          <div className="inside-container-one">
            <i className="fa-solid fa-heart"></i>
            <h2>MediCare</h2>
            <p className="d-flex flex-column justify-content-center align-items-center">
              Your trusted healthcare platform connecting patients with the best
              doctors.
            </p>
          </div>

          <div className="inside-container-two">
            <p>
              <i className="fa-solid fa-check"></i>Book appointments instantly
            </p>
            <p>
              <i className="fa-solid fa-check"></i>Top-rated specialists
            </p>
            <p>
              <i className="fa-solid fa-check"></i>Secure & confidential
            </p>
          </div>
        </div>
        <div className="Right-LR-container">
          {transfer ? <Register switchToLogin={SwitchtoLogin} /> : <Login />}

          {transfer ? (
            <div className="switch-form">
              <span>Already have an account?</span>
              <button onClick={SwitchtoLogin}>Sign in</button>
            </div>
          ) : (
            <div className="switch-form">
              <span>Dont't have an account?</span>
              <button onClick={SwitchtoRegister}>Create account</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login_Register
