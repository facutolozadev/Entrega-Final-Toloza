import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'
import './Checkout.css';
import CheckoutForm from './CheckoutForm/CheckoutForm';


function Checkout() {

  const { cart, calcTotalPrice } = useContext(CartContext)

  if(cart.length === 0) {
    return <Navigate to="/" />
  }

  return (
   
      <div className="checkout">
        <h2>Finalizar compra</h2>
        <div className="items__section">
          <h3>Productos a llevar:</h3>
          {
            cart.map((item) => (
              <div key={item.id}>
                <hr />
                <br />
                <br />
                <p>{item.name} (x{item.cantidad}) = ${item.price * item.cantidad} </p>
                <br />
                <br />
                <hr />
              </div>
            ))
          }
          <h3>Total a pagar: ${calcTotalPrice()}</h3>
        </div>
        <CheckoutForm cart={cart} calcTotalPrice={calcTotalPrice}/>
      </div>
    
  )
}

export default Checkout