import React, { useState, useEffect } from 'react'
import './BestSellers.css'
import { pedirDatos } from '../../../helpers/pedirDatos'

function BestSellers() {

  const [products, setProducts] = useState([])
  const [bestSellers, setBestSellers] = useState([])

  useEffect(() => {
    pedirDatos()
      .then(response => setProducts(response.sort((a, b) => b.sales - a.sales).slice(0, 6)))
  }, [])


  return (
    <div>BestSellers</div>
  )
}

export default BestSellers