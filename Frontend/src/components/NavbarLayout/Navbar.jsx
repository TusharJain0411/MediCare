import React, { useState, useEffect } from "react";

import {
  logoutUser,
  getProfile,
  getNotifications,
} from "../../services/userAuth";

import "../../CSS/navbar.css"

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { setUnreadCount } from "../../redux/slices/notificationSlice";

function Navbar() {


const navigate=useNavigate();
const [showUser,setShowUser]=useState(false);
const [user,setUser]=useState({});
const unreadCount = useSelector((state) => state.notification.unreadCount);
const dispatch = useDispatch();


const handleShowDetail=()=>{
  setShowUser(!showUser);
}

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await logoutUser(token);
    }

    localStorage.removeItem("token");

    navigate("/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

const showRole=()=>{
if(user.isAdmin){
  return "Admin";
}
else if(user.isDoctor){
  return "Doctor";
}
else{
  return "User";
}
}



useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const [profileRes, notificationRes] = await Promise.all([
        getProfile(token),
        getNotifications(token),
      ]);

      setUser(profileRes.data.user);

      const unread = notificationRes.data.notifications.filter(
        (n) => !n.isRead,
      ).length;

      dispatch(setUnreadCount(unread));
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, [dispatch]);


useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await getNotifications(token);

      dispatch(
        setUnreadCount(res.data.notifications.filter((n) => !n.isRead).length),
      );
    } catch (err) {
      console.log(err);
    }
  };


  fetchNotifications();

  
  const interval = setInterval(fetchNotifications, 5000);

  return () => clearInterval(interval);
}, [dispatch]);




  return (
    <>
      <div className="Navbar">
        <div className="Logo" onClick={() => navigate("/home")}>
          <i className="fa-solid fa-heart"></i>
          <div className="Logo-txt">
            <span>MediCare</span>
            <span className="role">{showRole()}</span>
          </div>
        </div>

        <div className="User-detail">
          <div
            className="notification"
            onClick={() => navigate("/notification")}
          >
            {unreadCount > 0 && (
              <span className="notification-count">{unreadCount}</span>
            )}
            <i className="fa-regular fa-bell"></i>
          </div>

          {showUser && (
            <div className=" Profile-extend">
              <h6 className="profile-avatar">{user?.name?.charAt(0)}</h6>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h4>{user?.name}</h4>
                <span>{user?.email}</span>
              </div>

              <button onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
              </button>
            </div>
          )}

          <div className="Profile" onClick={handleShowDetail}>
            <h6 className="profile-avatar">{user?.name?.charAt(0)}</h6>
            <h6 className="profile-name">{user?.name}</h6>
            {showUser ? (
              <i className="fa-solid fa-angle-up fa-bounce"></i>
            ) : (
              <i className="fa-solid fa-angle-down fa-bounce"></i>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar
