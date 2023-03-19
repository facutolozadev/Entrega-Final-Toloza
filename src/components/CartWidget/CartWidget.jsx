import React, { useContext } from 'react'
import './CartWidget.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {

  const { cart } = useContext(CartContext)

  return (
    <Link to="/cart" className="cart">
      <i className="fa-solid fa-cart-shopping"></i>
      {
        cart.length > 0 && <p>{cart.reduce((acc, prod) => acc + prod.cantidad, 0)}</p>
      }
    </Link>
  )
}

export default CartWidget