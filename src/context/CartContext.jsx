import { createContext, useState, useEffect } from 'react';


export const CartContext = createContext()

const init = JSON.parse(localStorage.getItem('carrito')) || [];
export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(init)

    const isInCart = (id) => {
        return cart.some((item) => item.id === id)
    }


    const calcTotalProducts = () => {
        return cart.reduce((acc, prod) => acc + prod.cantidad, 0)
    }

    const calcTotalPrice = () => {
        return cart.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
    }

    const addToCart = (item) => {
        if (isInCart(item.id)) {
            item.cantidad < item.stock
                && setCart(cart.map((prod) => prod.id === item.id ? { ...prod, cantidad: prod.cantidad + 1 } : prod))

        } else {
            setCart([...cart, item])
        }
    }

    const removeFromCart = (item) => {
        item.cantidad > 1 && setCart(cart.map((prod) => prod.id === item.id ? { ...prod, cantidad: prod.cantidad -= 1 } : prod))
    }

    const removeAllFromCart = (item) => {
        setCart(cart.filter((prod) => prod.id !== item.id))
    }

    const emptyCart = () => {
        setCart([])
    }


    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            isInCart,
            removeFromCart,
            emptyCart,
            calcTotalProducts,
            calcTotalPrice,
            removeAllFromCart,

        }}>
            {children}
        </CartContext.Provider>)
}
