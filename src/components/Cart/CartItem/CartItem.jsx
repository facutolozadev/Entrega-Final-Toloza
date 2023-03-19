import React from 'react'
import './CartItem.css'


function CartItem({ item, removeFromCart }) {
  return (
    <div key={item.id} className="cart__product">
      <img width="150px" src={item.img} alt="" />
      <div className="cart__product-info">
        <h3>{item.name}</h3>
        <p>Cantidad: {item.cantidad}</p>
        <p>Precio total: <strong>
          ${item.price * item.cantidad}
        </strong>
        </p>
        <button className="cart__remove-btn" onClick={() => removeFromCart(item)}>Eliminar</button>
      </div>
    </div>
  )
}

export default CartItem