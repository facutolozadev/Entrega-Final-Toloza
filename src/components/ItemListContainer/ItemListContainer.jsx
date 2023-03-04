import React, { useEffect, useState } from 'react'
import './ItemListContainer.css'
import { pedirDatos } from '../../helpers/pedirDatos' 
import Item from '../Item/Item'

const ItemListContainer = () => {

  const [productos, setProductos] = useState([])

  useEffect(() => {
    pedirDatos()
    .then(response => setProductos(response))
  },[])



  return (
    <div className="products__page">
      <h1>Nuestros productos</h1>
        <div className="products">
          {
            productos.map((producto) => (
             <Item key={producto.id} producto={producto}/>
            ))
          }
        </div>
    </div>
  )
}

export default ItemListContainer