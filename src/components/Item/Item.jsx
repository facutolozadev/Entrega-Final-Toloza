import React from 'react'
import './Item.css'
import {Link} from 'react-router-dom'

const Item = ({producto}) => {
  return (
    <Link to={`/product/${producto.id}`} className="product">
        <img src={producto.img} alt={producto.name} />
        <div className="product__info">
        <h3>{producto.name}</h3>
        <h4>${producto.price}</h4>
        </div>
    </Link>
  )
}

export default Item