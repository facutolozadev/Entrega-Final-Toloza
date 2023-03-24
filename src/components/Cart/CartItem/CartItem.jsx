import React, { useContext } from 'react'
import './CartItem.css'
import { CartContext } from '../../../context/CartContext'


function CartItem({ item }) {

  const { removeAllFromCart, removeFromCart, addToCart } = useContext(CartContext)
  return (
    <div key={item.id} className="cart__product">
      <img width="150px" src={item.img} alt="" />
      <div className="cart__product-info">
        <h3>{item.name}</h3>

        <div className="cart__add-or-remove-container">
          <button className="cart__add-or-remove" onClick={() => removeFromCart(item)}>-</button>
          <p>{item.cantidad}</p>
          <button className="cart__add-or-remove" onClick={() => addToCart(item)}>+</button>
        </div>

        <p>Subtotal: <strong>
          ${item.price * item.cantidad}
        </strong>
        </p>
        <button className="cart__remove-btn" onClick={() => removeAllFromCart(item)}>Eliminar</button>
      </div>
    </div>
  )
}

export default CartItem