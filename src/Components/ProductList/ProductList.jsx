
import { useState, useEffect  } from "react"
import "./ProductList.css"
import { useNavigate } from "react-router-dom";
import db from "../../data/db.json";
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductList = ({buscarTermino}) => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null)
    const [orden, setOrden] = useState("Relevante")
    const [filtros, setFiltros] = useState({categorias: [], tipos: []})
    
    const navigate = useNavigate();

    useEffect(() => {
        // Usa los datos del archivo JSON directamente
        try {
          setProductos(db.products); 
          AOS.refresh();
        } catch (err) {
          setError("Error al cargar los productos");
        }
      }, []);
 
   
 
const toggleFiltros = (tipoFiltro, valor) => {
    setFiltros((prev) => ({
        ...prev,
        [tipoFiltro]: prev[tipoFiltro].includes(valor) 
        ? prev[tipoFiltro].filter((item) => item !== valor)
        : [...prev[tipoFiltro], valor],
    }))
}

const normalizarTexto = (texto) => {
    return texto 
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); 
} 


const productosFiltrados = productos.filter((producto) => {
    const matchCategoria = 
    filtros.categorias.length === 0 || filtros.categorias.includes(producto.categoria);
    const matchTipo = 
    filtros.tipos.length === 0 || filtros.tipos.includes(producto.tipo);
    
   const matchBuscar = !buscarTermino || normalizarTexto(producto.nombre).includes(normalizarTexto(buscarTermino)) ||
   normalizarTexto(producto.descripcion).includes(normalizarTexto(buscarTermino));

  return matchCategoria && matchTipo && matchBuscar;
    
})
 


  const handleOrdenChange = (e) => {
    setOrden(e.target.value)
  }

  const productosOrdenados = [...productosFiltrados].sort((a,b) => {
    if(orden === "Precio: Menor a Mayor"){
        return a.precio - b.precio
    } if (orden === "Precio: Mayor a Menor") {
        return b.precio - a.precio
    } 
    return 0;
  });

 const handleImageClick = (id) => {
    navigate(`/producto/${id}`);
 }

 
  return (
    <section className="main-content">
   
        <aside className="filters">
            <h2>Filtros</h2>
            <div className="filters-category">
                <div className="filter-category">
                    <h3>Categorias</h3>
                    <label>
                        <input type="checkbox"
                        onChange={() => toggleFiltros("categorias", "Hombres")}
                        />
                        <span>Cintas</span>
                    </label>
                    <label>
                        <input type="checkbox" 
                        onChange={() => toggleFiltros("categorias", "Mujeres")}
                        />
                        <span>Cajas</span>
                    </label>
                    <label>
                        <input type="checkbox"
                        onChange={() => toggleFiltros("categorias", "Niños")}
                        />
                        <span>Bolsas</span>
                    </label>
                </div>

                <div className="filter-category">
                    <h3>Tipos</h3>
                    <label>
                        <input type="checkbox" 
                         onChange={() => toggleFiltros("tipos", "Prendas de abrigo")}
                        />
                        <span>Cintas de embalaje</span>
                    </label>
                    <label>
                        <input type="checkbox" 
                        onChange={() => toggleFiltros("tipos", "Ropa interior")}
                        />
                        <span>Bolsas de seguridad</span>
                    </label>

                    <label>
                        <input type="checkbox"
                        onChange={() => toggleFiltros("tipos", "Calzado")}
                        />
                        <span>Cajas y cinta</span>
                    </label>
                </div>
            </div>
        </aside>
        <main className="collections">
            <div className="options">
                <h2>TODAS LAS COLECCIONES</h2>
                <div className="sort-options">
                    <label>
                        Ordenar por:
                        <select onChange={handleOrdenChange} value={orden}>
                            <option>Relevante</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </label>
                </div>
            </div>

           <div className="products">
            {error ? (
                <p className="error-message">{error}</p>
            ): productosFiltrados.length > 0 ? (
                productosOrdenados.map((producto, index) => (
                    <div className="product-card" key={producto.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}  
                    data-aos-duration="800" 
                    >
                        <img src={producto.image} 
                        alt={producto.image}
                        className="product-image"
                         onClick={() => handleImageClick(producto.id)}
                          
                        />
                        <h3>{producto.nombre}</h3>
                        <p>${producto.precio}</p>
                    </div>
                ))
            ) : (
                <p className="no-results">
                    No hay productos que coincidan con los filtros seleccionados
                </p>
            ) }
           </div>

        </main>

    </section>
  )
}

export default ProductList