import React from 'react'
import navlogo from '../../assets/logo.jpg'
import navProfile from '../../assets/labcoat.jpg'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} className='nav-logo'/>

        <img src={navProfile} alt="" className="nav-profile" />
        
    </div>
  )
}

export default Navbar