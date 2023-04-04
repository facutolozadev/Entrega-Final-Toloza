import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext'
import './Checkout.css';
import CheckoutForm from './CheckoutForm/CheckoutForm';
import Spinner from '../Spinner/Spinner';
import { LoginContext } from '../../context/LoginContext';

function Checkout() {


  const [noStock, setNoStock] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const { user, logout } = useContext(LoginContext)
  console.log(user)
  const { cart, calcTotalPrice, emptyCart } = useContext(CartContext)

  if (cart.length === 0 && !isLoading) {
    return <Navigate to="/" />
  }


  if (noStock.length > 0) {
    emptyCart()

    return (
      <div className="checkout">
        <h3>No hay stock de:</h3>
        <ul>
          {noStock.map((item) => (
            <li>{item.name}</li>
          ))}
        </ul>
        <Link to="/">Volver al inicio</Link>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Spinner message={"Generando orden"} />
    )
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

      <CheckoutForm
        setIsLoading={setIsLoading}
        cart={cart}
        calcTotalPrice={calcTotalPrice}
        emptyCart={emptyCart}
        setNoStock={setNoStock}
        user={user}
        logout={logout}
      />
        
      
    </div>

  )
}

export default Checkout