import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Navbar from "./Components/Navbar/Navbar"
import DetailsProduct from "./Components/DetailsProduct/DetailsProduct"
import { CartProvider } from "./Components/CartContext/CartContext"
import Cart from "./Components/Cart/Cart"
import { useState } from "react"
import Search from "./Components/Search/Search"
import Footer from "./Components/Footer/Footer"
import WomenProductList from "./Components/WomenProductList/WomenProductList"

// 🔐 nuevos imports
import { AuthProvider } from "./Components/auth/AuthProvider"
import Login from "./Components/auth/Login"
import ProtectedRoute from "./Components/auth/ProtectedRoute"
import AdminPage from "./Components/Admin/AdminPage"

function App() {
  const [buscarTermino, setBuscarTermino] = useState("");
  const [mostrarBuscador, setMostrarBuscador] = useState(false)

  const handleBuscar = (termino) => {
    setBuscarTermino(termino.toLowerCase());
  };

  const alternarBuscador = () => {
    setMostrarBuscador(!mostrarBuscador)
  };

  return (
    <>
      <AuthProvider>
      <CartProvider>
      <Router>

      <Navbar alternarBuscador = {alternarBuscador} />

      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        <Route
  path="/"
  element={
    <ProtectedRoute roles={["user", "admin"]}>
      <Home buscarTermino={buscarTermino} mostrarBuscador={mostrarBuscador} />
    </ProtectedRoute>
  }
/>


        <Route path="/producto/:id" element={<DetailsProduct/>}/>
        <Route path="/carrito" element={<Cart/>}/>
        <Route path="/search" element={<Search onSearch={handleBuscar}/>}/>
        <Route path="/women" element={<WomenProductList onSearch={handleBuscar}/>}/>

        {/* 🔐 RUTA SOLO PARA ADMIN */}
        <Route path="/admin" element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }/>
      </Routes>

      <Footer/>

      </Router>
      </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
