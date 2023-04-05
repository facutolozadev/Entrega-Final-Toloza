import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import { CartProvider } from './context/CartContext'
import Checkout from './components/Checkout/Checkout'
import Orden from './components/Orden/Orden'
import LoginProvider from './context/LoginContext'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

function App() {

  return (
    <LoginProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="*" element={<ItemListContainer />} />
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/order/:id" element={<Orden />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>

          </BrowserRouter>
        </div>
      </CartProvider>
    </LoginProvider>
  )
}

export default App
