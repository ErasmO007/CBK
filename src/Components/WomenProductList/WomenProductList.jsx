import { useState, useEffect } from "react";
import "./WomenProductList.css"; // Puedes crear estilos específicos para este componente
import { useNavigate } from "react-router-dom";
import db from "../../data/db.json";
import AOS from "aos"; // Importar AOS
import "aos/dist/aos.css"; // Importar los estilos de AOS

const WomenProductList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setProductos(db.products); // Asegúrate de que "products" es la clave correcta en tu JSON
    } catch (err) {
      setError("Error al cargar los productos");
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  // Filtrar productos de la categoría "Mujer"
  const productosMujeres = productos.filter(
    (producto) => producto.categoria === "Mujeres"
  );

  const handleImageClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <section className="women-products">
      <h2>Ofertas en cintas y cajas </h2>
      <div className="products">
        {error ? (
          <p className="error-message">{error}</p>
        ) : productosMujeres.length > 0 ? (
          productosMujeres.map((producto, index) => (
            <div className="product-card" key={producto.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            >
              <img
                src={producto.image}
                alt={producto.nombre}
                className="product-image"
                onClick={() => handleImageClick(producto.id)}
              />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </div>
          ))
        ) : (
          <p className="no-results">
            No hay productos disponibles para la categoría "Bolsas de seguridad"".
          </p>
        )}
      </div>
    </section>
  );
};

export default WomenProductList;
