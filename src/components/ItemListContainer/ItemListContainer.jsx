import React, { useEffect, useState } from 'react'
import './ItemListContainer.css'
import { pedirDatos } from '../../helpers/pedirDatos'
import ItemList from './ItemList/ItemList'
import { useParams } from 'react-router-dom'


const ItemListContainer = () => {

  const { categoryId } = useParams();

  const [productos, setProductos] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      pedirDatos()
        .then(response => {
          if (!categoryId) {
            setProductos(response)
          } else {
            setProductos(response.filter((prod) => prod.category === categoryId))
          }
          setIsLoading(false)
        })


    }, 200)
  }, [categoryId])





  return (
    <div className="products__page">
      {
        isLoading ? (
          <h3>Cargando...</h3>
        ) : (
          <>
            <h1>{ categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "Nuestros productos"}</h1>
            <ItemList productos={productos} />
          </>
        )
      }
    </div>
  )
}

export default ItemListContainer