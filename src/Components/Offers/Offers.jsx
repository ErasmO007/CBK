import "./Offers.css";
import ofertaUno from "../../assets/oferta1.png";
import ofertaDos from "../../assets/oferta2.png";
import { useCart } from "../CartContext/CartContext"; 
import Notification from "../Notification/Notification";
import { useEffect, useState } from "react";
import AOS, { refresh } from "aos"; 
import "aos/dist/aos.css"; 

const Offers = () => {
  const { agregarAlCarrito } = useCart(); 
  const [notification, setNotification] = useState("");  
  const [notificationType, setNotificationType] = useState("success")
  // Datos de las ofertas
  useEffect(() => {
  AOS.refresh();
  }, []);
  const ofertas = [
    {
      id: 1,
      nombre: "Promocion de cajas",
      precio: 49.99,
      image: ofertaUno,
      descripcion: "Cajas de tres medidas diferentes con hasta un 30%.",
      oferta: "Solo Esta temporada"
    },
    {
      id: 2,
      nombre: "Cajas de seguridad",
      precio: 29.99,
      image: ofertaDos,
      descripcion: "Cajas de seguridad en rebaja con descuento del 50%.",
      oferta: "Solo Esta temporada"
    },
  ];

  const handleAgregarAlCarrito = (oferta) => {
    agregarAlCarrito({
      id: oferta.id,
      nombre: oferta.nombre,
      precio: oferta.precio,
      imagen: oferta.image,
      cantidad: 1,
    });
    setNotification("Producto agregado al carrito"); // Mensaje de notificación
    setNotificationType("success"); // Tipo de notificación
  };

  return (
    <>
      <Notification
        message={notification}
        type={notificationType}
        onClose={() => setNotification("")} // Limpia el mensaje al cerrar
      />
    <section className="offers">
      {ofertas.map((oferta, index) => (
        <div className="offer-card" key={oferta.id}
        data-aos="fade-up"
        data-aos-delay={index * 200} // Añade un retraso progresivo
        >
          <p className="category">{oferta.nombre.toUpperCase()}</p>
          <h2>{oferta.descripcion}</h2>
          <p  className="sale">{oferta.oferta}</p>
          <button
            className="btn"
            onClick={() => handleAgregarAlCarrito(oferta)}
          >
            COMPRAR AHORA
          </button>
          <img src={oferta.image} className="offer-image" alt={oferta.nombre} />
        </div>
      ))}
    </section>
    </>
  );
};

export default Offers;
