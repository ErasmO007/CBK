import { useParams } from "react-router-dom"
import "./DetailsProduct.css"
import { useEffect, useState } from "react"
import { useCart } from "../CartContext/CartContext"
import db from "../../data/db.json"; 
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Notification from "../Notification/Notification";
import Features from "../Features/Features";
 

const DetailsProduct = () => {
    const {id} = useParams()
    const [producto, setProducto] = useState(null)
    const [error, setError] = useState(null)
    const {agregarAlCarrito} = useCart();
    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState("success");
    
    const handleAgregarAlCarrito = () => {
      if (producto) {
        agregarAlCarrito({
          id: producto.id,
          imagen: producto.image,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        });
        setNotification("Producto agregado al carrito"); 
        setNotificationType("success"); 
      } else {
        setNotification("No se pudo agregar el producto"); 
        setNotificationType("error"); 
      }
    };
  
    useEffect(() => {
      try {
      
        const productoEncontrado = db.products.find(
          (prod) => prod.id === parseInt(id, 10) 
        );
  
        if (!productoEncontrado) {
          throw new Error("Producto no encontrado");
        }
  
        setProducto(productoEncontrado);
      } catch (err) {
        setError(err.message);
      }
    }, [id]);
  
    if (error) {
      return <h2 className="error-message">{error}</h2>;
    }


    if (error) {
        return <h2 className="error-message">{error}</h2>;  
    }

 
  return (
    <>
   <Notification
        message={notification}
        type={notificationType}
        onClose={() => setNotification("")} 
      />
     <div className="product-details">
        {
            producto ? (
                <>
                <img src={producto.image}alt={producto.nombre} className="image-small"/>
                <img src={producto.image}alt={producto.nombre} />
                <div className="product-infos">
                    <h1>{producto.nombre}</h1>
                    <p className="price">${producto.precio}</p>
                    <p className="description">{producto.descripcion}</p>
                    <button className="add-to-cart"
                    onClick={handleAgregarAlCarrito}
                    >Añadir al carrito</button>
                    <p className="note">
                Producto 100% original. El pago contra reembolso está 
                disponible para este producto.
                Política de devolución y cambio fácil dentro de los 7 días.
                </p>
                </div>
             
                </>
            ) : (
                <p>Cargando producto ...</p>
            )
        }
     </div>
     <RelatedProducts currentProduct={producto} products={db.products} />
     <Features/>
     </>
  )
}

export default DetailsProduct