import { createContext, useState } from 'react';


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    // console.log(cart)

    const addToCart = (item) => {
        setCart([...cart, item])
    }

    const isInCart = (id) => {
        // console.log(id)
        return cart.some((item) => item.id === id)
    }

    const removeFromCart = (item) => {
        item.cantidad > 1 
        ? setCart(cart.map((prod) => prod.id === item.id ? { ...prod, cantidad: prod.cantidad -= 1 } : prod)) 
        : setCart(cart.filter((prod) => prod.id !== item.id))
    }


    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            isInCart,
            removeFromCart

        }}>
            {children}
        </CartContext.Provider>)
}
