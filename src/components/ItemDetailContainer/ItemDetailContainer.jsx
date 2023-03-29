import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './ItemDetailContainer.css'
import ItemDetail from './ItemDetail/ItemDetail'
import { db } from '../../firebase/config'
import { doc, getDoc} from 'firebase/firestore'


function ItemDetailContainer() {

  const params = useParams()

  const [detail, setDetail] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, "productos", params.id)

    getDoc(docRef)
      .then((res) => {
        const doc = {...res.data(), id: res.id}
        setDetail(doc)
        setLoading(false)
      })
      
  }, [params])

  // console.log(detail)
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