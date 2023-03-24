import './ItemDetail.css'
import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../../context/CartContext'
import ItemCount from './ItemCount/ItemCount'
import { Link } from 'react-router-dom'

function ItemDetail({ detail }) {



  const { addToCart, isInCart, chooseSize, selectedSize, sizeStock, setSizeStock } = useContext(CartContext)
  const [cantidad, setCantidad] = useState(1)
  
  

  const handleAddToCart = () => {
    addToCart({ ...detail, cantidad })
  }

 

  // useEffect(() => {
  //   detail.size &&
  //   detail.size.find((item) => item.letterSize === selectedSize && setSizeStock(item))
  // }, [selectedSize])

  return (
    <>
      <img className="item__img" src={detail.img} alt={detail.name} />
      <div className="item__price-and-title">
        <h2>{detail.name}</h2>
        <h4>${detail.price}</h4>

        {
          isInCart(detail.id)
            ? (
              <div>
              <Link className="terminar__compra" to="/cart">Terminar mi compra</Link>
              
              </div>

            ) : (
              <>
                <ItemCount
                  max={detail.stock}
                  cantidad={cantidad}
                  setCantidad={setCantidad} />

                {/*Vista para los talles (a implementar)*/}
                {/* {
                  detail.size && (
                    <div className="item__select-container">
                      <p>Seleccione su talle:</p>
                      <select className="item__select" onChange={chooseSize} value={selectedSize}>
                        <option
                          value="S"
                        >
                          S
                        </option>
                        <option
                          value="M"
                        >
                          M
                        </option>
                        <option
                          value="XL"
                        >
                          XL
                        </option>
                      </select>
                    </div>
                  )
                } */}
                <p className="item__stock">Stock disponible: {detail.size ? sizeStock.stock : detail.stock}</p>
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