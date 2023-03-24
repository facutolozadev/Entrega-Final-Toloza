import React, { useContext } from 'react'
import './Cart.css'
import { CartContext } from '../../context/CartContext';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

function Cart() {

    const { cart, emptyCart, calcTotalPrice } = useContext(CartContext)

    return (
        <div className="cart__container">
            <h2>Tu carrito</h2>
            {
                cart.length > 0 ? (
                    <div className="cart__items-container">

                        {
                            cart.map((item) => (
                                <CartItem key={item.id} item={item} 
                                />
                            ))
                        }

                        <div className="cart__compra-container">
                            <h2>Total: ${calcTotalPrice()}</h2>
                            <Link 
                            to="/checkout"
                            className="cart__realizar-compra">Realizar compra</Link>
                            <button 
                            onClick={emptyCart}className="cart__vaciar">
                                Vaciar carrito
                            </button>
                        </div>
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