import React from "react";
import { NavLink } from "react-router-dom";
import "../../CSS/sidebar.css";
import { useSelector } from "react-redux";

function UserMenu() {

  const Nav_width = useSelector((state) => state.alert.Nav_width);


  const userMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "fa-regular fa-house",
     
      
    },
    {
      name: "Appointments",
      path: "/userappointment",
      icon: "fa-regular fa-calendar",
   
    },
    {
      name: "Apply Doctor",
      path: "/applydoctor",
      icon: "fa-solid fa-stethoscope",
   
    },
  ];

  return (
    <>
      {userMenu.map((menu, index) => (
        <NavLink
          to={menu.path}
          key={index}
          className={
            Nav_width
              ? ({ isActive }) =>
                  isActive
                    ? `Shrinknav-link active  `
                    : `Shrinknav-link  `
              : ({ isActive }) =>
                  isActive ? `nav-link active  ` : `nav-link  `
          }
        >
          <div>
            <i className={menu.icon}></i>
            <span>{menu.name}</span>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default UserMenu;
