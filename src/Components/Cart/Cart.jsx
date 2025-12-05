import { useCart } from "../CartContext/CartContext"
import { jsPDF } from "jspdf";
import "./Cart.css"

const Cart = () => {
    const { carrito, actualizarCantidad, eliminarProducto } = useCart(); 

    const costoDeEnvio = 10;
    const subTotal = carrito.reduce((acc, producto) => 
        acc + producto.precio * producto.cantidad, 0
    );

    const total = subTotal + costoDeEnvio;

    const handleAumentarCantidad = (productoId) => {
        actualizarCantidad(productoId, 1)
    };

    const handleDisminuirCantidad = (productoId) => {
        const producto = carrito.find((item) => item.id === productoId)
        if (producto.cantidad > 1) {
            actualizarCantidad(productoId, -1)
        }
    };


    const handleDownloadTicket = () => {
        const pdf = new jsPDF();
        let y = 10;

        pdf.setFontSize(18);
        pdf.text("TICKET DE COMPRA", 60, y);
        y += 10;

        pdf.setFontSize(12);
        pdf.text(`Fecha: ${new Date().toLocaleString()}`, 10, y);
        y += 10;

        pdf.text("Productos:", 10, y);
        y += 8;

        carrito.forEach((producto) => {
            pdf.text(
                `${producto.nombre}  x${producto.cantidad}  -  $${(producto.precio * producto.cantidad).toFixed(2)}`,
                10,
                y
            );
            y += 7;
        });

        y += 5;
        pdf.text(`Subtotal: $${subTotal.toFixed(2)}`, 10, y);
        y += 7;
        pdf.text(`Envío: $${costoDeEnvio.toFixed(2)}`, 10, y);
        y += 7;

        pdf.setFontSize(14);
        pdf.text(`TOTAL: $${total.toFixed(2)}`, 10, y);

        // Descargar archivo
        pdf.save("ticket_compra.pdf");
    };

    return (
        <div className="cart-container">
            <h2>TU <span>CARRITO</span></h2>

            {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
            ) : (
                <>
                    <div className="cart-header">
                        <p>Producto</p>
                        <p>Precio</p>
                        <p>Cantidad</p>
                        <p>Total</p>
                        <p>Acción</p>
                    </div>

                    <ul className="cart-items">
                        {carrito.map((producto) => {
                            const totalPrecio = producto.precio * producto.cantidad;
                            return (
                                <li className="cart-item" key={producto.id}>
                                    <div className="product-info">
                                        <img 
                                            src={producto.imagen || "https://via.placeholder.com/150"} 
                                            alt=""
                                            className="product-images"
                                        />
                                        <span>{producto.nombre}</span>
                                    </div>

                                    <p>${producto.precio.toFixed(2)}</p>

                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleDisminuirCantidad(producto.id)}
                                        >
                                            -
                                        </button>

                                        <input 
                                            type="number"
                                            className="quantity-input"
                                            readOnly
                                            value={producto.cantidad}
                                        />

                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleAumentarCantidad(producto.id)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p>${totalPrecio.toFixed(2)}</p>

                                    <button
                                        className="delete-btn"
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}

            <div className="cart-summary">
                <h2>TU <span>CARRITO</span></h2>

                <p>Total Parcial: <span>${subTotal.toFixed(2)}</span></p>
                <p>Tarifa de envío: <span>${costoDeEnvio.toFixed(2)}</span></p>
                <p className="total">Total: <span>${total.toFixed(2)}</span></p>

                <button
                    className="checkout-btn"
                    onClick={handleDownloadTicket}
                >
                    PASAR POR LA CAJA
                </button>
            </div>
        </div>
    );
};

export default Cart;
