import React from 'react'
import Navbar from '../components/NavbarLayout/Navbar'
import Sidebar from '../components/SidebarLayout/Sidebar'


import { useDispatch, useSelector } from "react-redux";
import { navExpand,navSrink } from "../Redux/slices/alertSlice";
import "../CSS/layout.css"


function Layout({children}) {
const dispatch=useDispatch();
const Nav_width = useSelector((state) => state.alert.Nav_width);

  return (
    <div className='layout'>
      <div className={Nav_width?'Sidebar-shrink':'Sidebar'}>
          <Sidebar/>
      </div>

      <div className={Nav_width ? "content-shrink":'Content'}>
        <div className='header'>
           <Navbar/>
        </div>
        <div className='body'>
            {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
