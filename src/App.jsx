import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './views/Home/Home'
import ItemDetail from './views/ItemDetail/ItemDetail'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/product/:id" element={<ItemDetail/>}/>
        </Routes>
      </BrowserRouter> 
    </div>
  )
}

export default App
