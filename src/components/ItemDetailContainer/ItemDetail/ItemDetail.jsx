import './ItemDetail.css'
import { useContext, useState } from 'react'
import { CartContext } from '../../../context/CartContext'
import ItemCount from './ItemCount/ItemCount'
import { Link } from 'react-router-dom'

function ItemDetail({ detail }) {



  const { addToCart, isInCart, chooseSize, selectedSize, sizeStock, setSizeStock } = useContext(CartContext)
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
              <div className="terminar__compra-container">
                <Link className="terminar__compra" to="/cart">Terminar mi compra</Link>
                <Link className="terminar__compra" to="/">Seguir comprando</Link>
              </div>

            ) : (
              <>
                {
                  detail.stock > 0
                    ?
                    (
                      <>
                        <ItemCount
                          max={detail.stock}
                          cantidad={cantidad}
                          setCantidad={setCantidad} />

                        <p className="item__stock">Stock disponible: {detail.stock}</p><button onClick={handleAddToCart} className="item__add-button">Añadir al carrito</button>
                        <p className="item__description">{detail.description}</p>
                      </>
                    )
                    : <p style={{ color: "red" }}><strong>No hay stock de este producto</strong></p>
                }

              </>
            )
        }


      </div>
    </>
  )
}

export default ItemDetail