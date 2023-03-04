import { useState, useEffect } from 'react'
import { pedirDatos } from '../../helpers/pedirDatos'
import {useParams} from 'react-router-dom'
import './ItemDetail.css'

function ItemDetail() {

  const params = useParams()

   
  const [detail, setDetail] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pedirDatos()
    .then(res => setTimeout(() => {
      setDetail(res.find(item => item.id === parseInt(params.id)))
      setLoading(false)
    }, 2000))    
},[])

 
  return (
    <div className="item__detail">
      {loading ? (
        <h3>cargando...</h3>
      ):(
        <>
        <img src={detail.img} alt={detail.name} />
        <div className="item__price-and-title">
          <h2>{detail.name}</h2>
          <h4>${detail.price}</h4>
          <button className="item__add-button">Añadir al carrito</button>
          <p className="item__description">{detail.description}</p>
        </div>
      </>
      ) 
      }
    </div>
  )
}

export default ItemDetail