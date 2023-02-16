import React, { useState } from 'react'
import Logo from '../../assets/img/Logo.png'
import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
const Navbar = () => {



  return (
    <nav className="nav">
        <img className="nav__logo" src={Logo} alt="logo" />     
        <ul className="nav__ul">
            <li className="nav__ul-li">
                <a href="#">Inicio</a>
            </li>
            <li className="nav__ul-li">
                <a href="#">Nosotros</a>
            </li>
            <li className="nav__ul-li">
                <a href="#">Contacto</a>
            </li>
            <li>
                <CartWidget/>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar