import React from 'react'
import { NavLink } from "react-router-dom";
import "../../CSS/sidebar.css";
import { useSelector } from "react-redux";

function AdminMenu() {

const Nav_width = useSelector((state) => state.alert.Nav_width);


  const AdminMenu = [
    {
      name: "Dashboard",
      path: "/home",
      icon: "fa-regular fa-house",
    },
    {
      name: "Doctors",
      path: "/doctorslist",
      icon: "fa-solid fa-stethoscope",
    },
    {
      name: "Users",
      path: "/userslist",
      icon: "fa-solid fa-user-group",
    },
    {
      name: "Profile",
      path: `/adminprofile`,
      icon: "fa-solid fa-user",
    },
  ];

  return (
    <>
      {AdminMenu.map((menu, index) => (
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
  )
}

export default AdminMenu
