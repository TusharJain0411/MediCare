import React from 'react'
import { NavLink } from "react-router-dom";
import "../../CSS/sidebar.css";
import { useSelector } from "react-redux";


function DoctorMenu() {

const Nav_width = useSelector((state) => state.alert.Nav_width);

const token = localStorage.getItem("token");
  const DoctorMenu = [
    {
      name: "Home",
      path: "/home",
      icon: "fa-regular fa-house",
     
      
    },
    {
      name: "Appointments",
      path: "/doctorappointment",
      icon: "fa-regular fa-calendar",
   
    },
    {
      name: "Profile",
      path: "/doctorprofile",
      icon: "fa-solid fa-user",
   
    },
  ];


  return (
    <>
       {DoctorMenu.map((menu, index) => (
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

export default DoctorMenu
