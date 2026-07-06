import React,{useState,useRef, useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signupSuccess,
  setError,
  clearMessages,
} from "../Redux/slices/userSlice";
import { showLoading, hideLoading } from "../Redux/slices/alertSlice";
import {RegisteUser} from "../services/userAuth"


import "../CSS/Register.css"


function Register({ switchToLogin }) {
  const dispatch = useDispatch();
  const inputs = useRef([]);
  const submitBtn = useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
 

  const { error, success, isLoggedIn } = useSelector((state) => state.user);
 const loading = useSelector((state) => state.alert?.loading ?? false);


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

      if (inputs.current[index + 1]) {
        inputs.current[index + 1].focus();
      } else {
        submitBtn.current.click();
      }
    }
  };

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmmit = async (e) => {
    e.preventDefault();

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.phone ||
      !registerData.password
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      
      dispatch(showLoading());
      const response = await RegisteUser(registerData);
      dispatch(hideLoading());

      dispatch(signupSuccess(response.data.message));

      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      
      setTimeout(() => {
        switchToLogin(); 
      }, 500);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message || error.message || "Registration failed",
      );

      dispatch(
        setError(error.response?.data?.message || "Registration failed"),
      );
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleShowPassword = () => {
    setShowPassword(true);
  };
  const handleHidePassword = () => {
    setShowPassword(false);
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessages());
    }
  }, [success, dispatch]);


  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="Register-component">
        <h4 className="logo">
          <i className="fa-solid fa-heart"></i> MediCare
        </h4>
        <h4>Create account</h4>
        <p>Join thousands of patients on MediCare</p>

        <form className="RegisterInput" onSubmit={handleSubmmit}>
          <div>
            <label>Full Name</label>
            <i className="fa-regular fa-user"></i>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              ref={(el) => (inputs.current[0] = el)}
              onKeyDown={(e) => handleKeyDown(e, 0)}
            />
          </div>
          <div>
            <label>Email Address</label>
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              ref={(el) => (inputs.current[1] = el)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
            />
          </div>
          <div>
            <label>Phone</label>
            <i className="fa-solid fa-phone"></i>
            <input
              type="text"
              name="phone"
              placeholder="+91  XXXXX  XXXXX"
              onChange={handleChange}
              ref={(el) => (inputs.current[2] = el)}
              onKeyDown={(e) => handleKeyDown(e, 2)}
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
              ref={(el) => (inputs.current[3] = el)}
              onKeyDown={(e) => handleKeyDown(e, 3)}
            />
          </div>
          <button ref={submitBtn}>Create Account</button>
        </form>
      </div>
    </>
  );
}

export default Register
