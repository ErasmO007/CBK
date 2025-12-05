 
import { useEffect, useState } from 'react'
import ProductList from '../ProductList/ProductList'
import Search from '../Search/Search'
import Hero from '../Hero/Hero';
import Offers from '../Offers/Offers';
import Features from '../Features/Features';
import Suscribe from '../Suscribe/Suscribe';
import 'aos/dist/aos.css';
import AOS from "aos";
const Home = ({buscarTermino, mostrarBuscador}) => {
  const [buscarTerminoLocal, setBuscarTerminoLocal] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    AOS.refresh();
  }, []);

  const handleBuscar = (termino) => {
    setBuscarTerminoLocal(termino)
  }
 
  return (
    <>
  {!mostrarBuscador && <Hero/>}
  {mostrarBuscador && <Search onSearch = {handleBuscar}/>}
 
    <ProductList buscarTermino = {buscarTerminoLocal || buscarTermino} />
    <Offers />
    <Features/>
    <Suscribe/>
    </>
  )
}

export default Home