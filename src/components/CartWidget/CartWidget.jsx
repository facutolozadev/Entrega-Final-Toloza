import React, { useContext } from 'react'
import './CartWidget.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartWidget = () => {

  const { cart, calcTotalProducts} = useContext(CartContext)

  return (
    <Link to="/cart" className="cart">
      <i className="fa-solid fa-cart-shopping"></i>
      {
        calcTotalProducts() > 0 && <p>{calcTotalProducts()}</p>
      }
    </Link>
  )
}

export default CartWidget