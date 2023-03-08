import React, { useState, useEffect } from 'react'
import Logo from '../../assets/img/Logo.png'
import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
const Navbar = () => {

  const [isOpened, setIsOpened] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null)

 

     
  return (
    <nav className="nav">
        <Link to="/">
        <img className="nav__logo" src={Logo} alt="logo" /> 
        </Link>    
       
        <div className="nav__burger-and-cart-container">
        <ul className={`nav__ul ${ isOpened  ? "active" : ""}`}>
            <li className="nav__ul-li">
                <Link to="/category/pants" href="#">Pantalones</Link>
            </li>
            <li className="nav__ul-li">
                <Link to="/category/T-shirts">Remeras</Link>
            </li>
            <li className="nav__ul-li">
                <Link to="/category/socks">Medias</Link>
            </li>
        </ul>
          <CartWidget/>
          <i
          onClick={() => setIsOpened(!isOpened)} 
          className="fa-solid fa-bars nav__burger-btn"/>
        </div>
    </nav>
  )
}

export default Navbar