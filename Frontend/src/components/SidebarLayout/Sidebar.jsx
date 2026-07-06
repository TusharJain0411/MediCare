import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { navExpand, navSrink } from "../../Redux/slices/alertSlice";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/userAuth';
import "../../CSS/sidebar.css";
import UserMenu from "./UserMenu";
import AdminMenu from './AdminMenu';
import DoctorMenu from './DoctorMenu';
import { logout } from "../../redux/slices/userSlice";


function Sidebar() {

const navigate = useNavigate();
const dispatch = useDispatch();
const Nav_width = useSelector((state) => state.alert.Nav_width);

const currentUser = useSelector((state) => state.user.currentUser);

const isAdmin = currentUser?.isAdmin;
const isDoctor = currentUser?.isDoctor;

const handleLogout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      await logoutUser(token);
    }

    dispatch(logout());
    navigate("/", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

  const MenuComponent = currentUser?.isAdmin
    ? AdminMenu
    : currentUser?.isDoctor
      ? DoctorMenu
      : UserMenu;



  return (
    <>
      <div className="sidebar">
        {Nav_width ? (
          <button
            className="expand-shrink"
            onClick={() => {
            
              dispatch(navExpand());
            }}
          >
            <i className="fa-solid fa-angles-right fa-shake"></i>
          </button>
        ) : (
          <button
            className="expand-shrink"
            onClick={() => {
              
              dispatch(navSrink());
            }}
          >
            <i className="fa-solid fa-angles-left fa-shake"></i>
          </button>
        )}

        <div className="actions">
          <div className="MenuList">
            <MenuComponent />
          </div>

          <button
            className={Nav_width ? "shrinkLogout" : "Logout"}
            onClick={handleLogout}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar
