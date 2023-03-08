import React from 'react'
import './ItemList.css'
import Item from './Item/Item'

function ItemList({productos}) {
  return (
    <div className="products">
      {
        productos.map((producto) => (
         <Item key={producto.id} producto={producto}/>
        ))
      }
    </div>
  )
}

export default ItemList