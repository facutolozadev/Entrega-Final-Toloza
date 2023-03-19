import React from 'react'

import './ItemCount.css'

function ItemCount({ max, cantidad, setCantidad }) {

    

    const handleSumar = () => {
        cantidad < max && setCantidad(cantidad + 1)
    }


    const handleRestar = () => {
        cantidad > 1 && setCantidad(cantidad - 1)
    }

    return (
        <div className="item__counter">
            <button
                onClick={handleRestar}
                className="item__counter-button"
            >-</button>

            <strong>{cantidad}</strong>

            <button
                onClick={handleSumar}
                className="item__counter-button">+</button>
        </div>
    )
}

export default ItemCount