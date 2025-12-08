import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPage.css";

export default function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoria: "",
    image: "",
    precio: ""
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await axios.get("http://localhost:3000/productos");
    setProductos(res.data);
  };

  // Convertir imagen a base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId === null) {
      await axios.post("http://localhost:3000/productos", {
        ...form,
        precio: Number(form.precio)
      });
      alert("Producto agregado 🎉");
    } else {
      await axios.put(`http://localhost:3000/productos/${editId}`, {
        ...form,
        precio: Number(form.precio)
      });
      alert("Producto actualizado ✔");
    }

    fetchProductos();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      descripcion: "",
      categoria: "",
      image: "",
      precio: ""
    });
    setPreview("");
    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este producto?")) return;

    await axios.delete(`http://localhost:3000/productos/${id}`);
    alert("Producto eliminado ❌");
    fetchProductos();
  };

  const handleEdit = (p) => {
    setEditId(p.id);
    setForm({
      nombre: p.nombre,
      descripcion: p.descripcion,
      categoria: p.categoria,
      image: p.image,
      precio: p.precio
    });
    setPreview(p.image);
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input placeholder="Descripción" value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
        <input placeholder="Categoría" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />

        {/* SUBIR IMAGEN */}
        <label className="file-label">
          Seleccionar Imagen
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        {/* Vista previa */}
        {preview && <img className="preview" src={preview} alt="preview" />}

        <input type="number" placeholder="Precio" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />

        <button className="btn-add" type="submit">
          {editId ? "Actualizar Producto" : "Agregar Producto"}
        </button>

        {editId && (
          <button className="btn-cancel" type="button" onClick={resetForm}>
            Cancelar Edición
          </button>
        )}
      </form>

      {/* LISTA */}
      <div className="product-grid">
        {productos.map(p => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.nombre} className="product-img" />

            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>
            <p><strong>Categoría:</strong> {p.categoria}</p>
            <p><strong>Precio:</strong> ${p.precio}</p>

            <button className="btn-edit" onClick={() => handleEdit(p)}>Editar</button>
            <button className="btn-delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
