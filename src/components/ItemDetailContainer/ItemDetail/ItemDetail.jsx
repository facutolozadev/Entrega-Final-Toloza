import React from 'react'
import './ItemDetail.css'

function ItemDetail({ detail }) {
  return (
    <>
        <img className="item__img" src={detail.img} alt={detail.name} />
        <div className="item__price-and-title">
          <h2>{detail.name}</h2>
          <h4>${detail.price}</h4>
          <button className="item__add-button">Añadir al carrito</button>
          <p className="item__description">{detail.description}</p>
        </div>
    </>
  )
}

export default ItemDetail