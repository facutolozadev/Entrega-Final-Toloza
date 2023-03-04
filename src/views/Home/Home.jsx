import React from 'react'
import BestSellers from './BestSellers/BestSellers'
import './Home.css'
import ItemListContainer from '../../components/ItemListContainer/ItemListContainer'
function Home() {
  return (
    <div className="home">
        <ItemListContainer/>
    </div>
  )
}

export default Home