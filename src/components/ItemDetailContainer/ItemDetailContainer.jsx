import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './ItemDetailContainer.css'
import ItemDetail from './ItemDetail/ItemDetail'
import { db } from '../../firebase/config'
import { doc, getDoc } from 'firebase/firestore'
import Spinner from '../Spinner/Spinner'


function ItemDetailContainer() {

  const { id } = useParams()
  const navigate = useNavigate();


  const [detail, setDetail] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, "productos", id)

    getDoc(docRef)
      .then((res) => {
        if (!res.data()) {
          navigate('/')
        }
        const doc = { ...res.data(), id: res.id }
        setDetail(doc)
        setLoading(false)

      })

  }, [id])



  return (
    <div className="item__detail-container">
      {loading ? (
        <Spinner message={"Cargando"} />
      ) : (
        <ItemDetail detail={detail} />
      )
      }
    </div>
  )
}

export default ItemDetailContainer