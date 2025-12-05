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
 
function App() {
 const [buscarTermino, setBuscarTermino] = useState("");
 const [mostrarBuscador, setMostrarBuscador] = useState(false)


 const handleBuscar = (termino) => {
  setBuscarTermino(termino.toLoweCase())
  } 

  const alternarBuscador = () => {
    setMostrarBuscador(!mostrarBuscador)
  }


  return (
    <>
      <CartProvider> 
     <Router>
     <Navbar alternarBuscador = {alternarBuscador}  /> 
     <Routes> 
     <Route path="/" element ={  <Home buscarTermino = {buscarTermino} mostrarBuscador= {mostrarBuscador} /> }/>
     <Route path="/producto/:id" element ={  <DetailsProduct/> }/>
     <Route path="/carrito" element ={  <Cart/> }/>
     <Route path="/search" element ={  <Search onSearch = {handleBuscar}/> }/>
     <Route path="/women" element ={< WomenProductList onSearch = {handleBuscar}/> }/>
     </Routes> 
     <Footer/> 
     </Router>
     </CartProvider>
    </>
  )
}

export default App
