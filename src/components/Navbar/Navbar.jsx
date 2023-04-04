import React, { useState, useContext } from 'react'
import Logo from '../../assets/img/Logo.png'
import './Navbar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'
import {RiLogoutBoxRLine} from 'react-icons/ri'

const Navbar = () => {

  const [isOpened, setIsOpened] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null)

  const { user, logout } = useContext(LoginContext)

  return (
    <nav className="nav">
      <div className="nav__logo-and-categories-container">
        <Link to="/">
          <img className="nav__logo" src={Logo} alt="logo" />
        </Link>
        <ul className={`nav__ul ${isOpened ? "active" : ""}`}>
          <li className="nav__ul-li">
            <Link onClick={() => setIsOpened(false)} to="/category/pantalones" href="#">Pantalones</Link>
          </li>
          <li className="nav__ul-li">
            <Link onClick={() => setIsOpened(false)} to="/category/remeras">Remeras</Link>
          </li>
          <li className="nav__ul-li">
            <Link onClick={() => setIsOpened(false)} to="/category/medias">Medias</Link>
          </li>
        </ul>

      </div>

      <div className="nav__burger-and-cart-container">
        {
          user.logged
            ? <>
                <strong>Bienvenido/a {user.email}</strong>
                <RiLogoutBoxRLine 
                onClick={logout}
                className="nav__logout"/>
              </>
            : <>
                <Link className="sing-in" to="/register">Registrarse</Link>
                <Link className="login" to="/login">Ingresar</Link>
              </>
        }
        <CartWidget />
        <i
          onClick={() => setIsOpened(!isOpened)}
          className="fa-solid fa-bars nav__burger-btn" />
      </div>
    </nav>
  )
}

export default Navbar