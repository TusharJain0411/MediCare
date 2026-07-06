import React, { useState,useRef,useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../services/userAuth";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  setError,
  clearMessages,
} from "../redux/slices/userSlice";
import {showLoading,hideLoading} from "../Redux/slices/alertSlice"
import "../CSS/Login.css"

function Login() {
const dispatch = useDispatch();


const { error, success, isLoggedIn } = useSelector((state) => state.user);
const loading = useSelector((state) => state.alert?.loading ?? false);

const navigate = useNavigate();
const inputs = useRef([]);
const submitBtn = useRef();
const [showPassword,setShowPassword]=useState(false);
  

const [loginData,setLoginData]=useState({
    name:"",
    email:"",
    phone:"",
    password:""
})



const handleKeyDown = (e, index) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    inputs.current[index + 1]?.focus();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    inputs.current[index - 1]?.focus();
  }

  if (e.key === "Enter") {
    e.preventDefault();

    // Move to next input if available
    if (inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    } else {
      // Click submit button if this is the last input
      submitBtn.current.click();
    }
  }
};

const handleChange=(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value});
}

const handleSubmmit=async(e)=>{
    e.preventDefault();
 const { email, password } = loginData;

     if (!email || !password) {
       toast.error("All fields are required");
       return;
     }

     try {

      dispatch(showLoading());


 
       const res = await LoginUser(loginData);
     
      

       dispatch(loginSuccess(res.data));

      
  
      
       setTimeout(() => {
          
           dispatch(hideLoading());
         navigate("/home", { replace: true });
       window.location.reload();
           
       

       }, 1000);
      
        
       
     } catch (error) {
       const message = error.response?.data?.message || "Login failed";
        dispatch(hideLoading());
       dispatch(setError(message));
     }
}


const handleShowPassword=()=>{
    setShowPassword(true);
}
const handleHidePassword=()=>{
    setShowPassword(false);
}




  return (
    <>
      <div className="Login-component">
        <h4 className="logo">
          <i className="fa-solid fa-heart"></i> MediCare
        </h4>
        <h2>Welcome back</h2>
        <p>Sign in to your account to continue</p>

        <form className="LoginInput">
          <div>
            <label>Email Address</label>
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              ref={(el) => (inputs.current[0] = el)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
          </div>
          <div>
            <label>Password</label>
            <i className="fa-solid fa-lock"></i>
            {showPassword ? (
              <i
                className="fa-solid fa-eye-slash"
                onClick={handleHidePassword}
              ></i>
            ) : (
              <i className="fa-solid fa-eye" onClick={handleShowPassword}></i>
            )}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              ref={(el) => (inputs.current[1] = el)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
          </div>
           {
            loading
            ?
          <button className="SignIn" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm  mx-2"
              role="status"
              aria-hidden="true"
            ></span>
            Sign In...
          </button>
           :
          <button className="SignIn" ref={submitBtn} onClick={handleSubmmit}>
            <span>Sign In</span>
          </button>
          }
        </form>
      </div>
    </>
  );
}

export default Login

