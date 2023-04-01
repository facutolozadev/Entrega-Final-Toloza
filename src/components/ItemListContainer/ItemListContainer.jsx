import React, { useEffect, useState } from 'react'
import './ItemListContainer.css'
import ItemList from './ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Spinner from '../Spinner/Spinner'

const ItemListContainer = () => {

  const { categoryId } = useParams();

  const [productos, setProductos] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {

    setIsLoading(true)

    const productosRef = collection(db, "productos")
    const q = categoryId
      ? query(productosRef, where("category", "==", categoryId))
      : productosRef

    getDocs(q)
      .then((res) => {
        const docs = res.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
        setProductos(docs)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [categoryId])

  return (
    <div className="products__page">
      {
        isLoading ? (
          <Spinner message={"Cargando"}/>
        ) : (
          <>
            <h1>{categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "Nuestros productos"}</h1>
            <ItemList productos={productos} />
          </>
        )
      }
    </div>
  )
}

export default ItemListContainer