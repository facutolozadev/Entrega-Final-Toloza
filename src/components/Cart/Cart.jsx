import React, { useContext } from 'react'
import './Cart.css'
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

function Cart() {

    const { cart, removeFromCart } = useContext(CartContext)

    return (
        <div className="cart__container">
            {
                cart.length > 0 ? (
                    <div className="cart__items-container">

                        {
                            cart.map((item) => (
                                <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
                            ))
                        }

                        <h2>Total: ${cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)}</h2>
                        
                    </div>
                ) : (
                    <div className="cart__error-container">
                        <h3>No tienes ningún producto en tu carrito</h3>
                        <Link to="/">Continuar comprando</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Cart