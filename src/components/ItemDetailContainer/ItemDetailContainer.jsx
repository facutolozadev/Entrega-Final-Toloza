import { useState, useEffect } from 'react'
import { pedirDatos } from '../../helpers/pedirDatos'
import { useParams } from 'react-router-dom'
import './ItemDetailContainer.css'
import ItemDetail from './ItemDetail/ItemDetail'

function ItemDetailContainer() {

  const params = useParams()

  const [detail, setDetail] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pedirDatos()
      .then(res => setTimeout(() => {
        setDetail(res.find(item => item.id === parseInt(params.id)))
        setLoading(false)
      }, 200))
  }, [params])


  return (
    <div className="item__detail-container">
      {loading ? (
        <h3>cargando...</h3>
      ) : (
        <ItemDetail detail={detail} />
      )
      }
    </div>
  )
}

export default ItemDetailContainer