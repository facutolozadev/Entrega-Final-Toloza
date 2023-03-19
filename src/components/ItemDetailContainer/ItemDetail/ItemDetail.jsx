import './ItemDetail.css'
import { useContext, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import ItemCount from './ItemCount/ItemCount'
import { Link } from 'react-router-dom'

function ItemDetail({ detail }) {



  const { addToCart, isInCart } = useContext(CartContext)
  const [cantidad, setCantidad] = useState(1)


  const handleAddToCart = () => {
    addToCart({ ...detail, cantidad })
  }

  return (
    <>
      <img className="item__img" src={detail.img} alt={detail.name} />
      <div className="item__price-and-title">
        <h2>{detail.name}</h2>
        <h4>${detail.price}</h4>

        {
          isInCart(detail.id)
            ? (
              <Link className="terminar__compra" to="/cart">Terminar mi compra</Link>

            ) : (
              <>
                <ItemCount
                  max={detail.stock}
                  cantidad={cantidad}
                  setCantidad={setCantidad} />
                <button onClick={handleAddToCart} className="item__add-button">Añadir al carrito</button>
                <p className="item__description">{detail.description}</p>
              </>
            )
        }


      </div>
    </>
  )
}

export default ItemDetail