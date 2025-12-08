import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json({ limit: "100mb" }));

// Ruta absoluta del archivo JSON
const PRODUCTS_FILE = path.resolve("src/data/db.json");

// Leer DB
function readDB() {
  try {
    const data = fs.readFileSync(PRODUCTS_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo DB:", err);
    return { products: [] };
  }
}

// Guardar DB
function writeDB(data) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error escribiendo DB:", err);
  }
}

// ============================
// GET -> Obtener productos
// ============================
app.get("/productos", (req, res) => {
  const data = readDB();
  res.json(data.products);
});

// ============================
// POST -> Agregar producto
// ============================
app.post("/productos", (req, res) => {
  const data = readDB();

  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  data.products.push(newProduct);
  writeDB(data);

  res.json(newProduct);
});

// ============================
// PUT -> Editar producto
// ============================
app.put("/productos/:id", (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);

  const index = data.products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });

  data.products[index] = { id, ...req.body };

  writeDB(data);

  res.json(data.products[index]);
});

// ============================
// DELETE -> Eliminar producto
// ============================
app.delete("/productos/:id", (req, res) => {
  const data = readDB();
  const id = parseInt(req.params.id);

  data.products = data.products.filter(p => p.id !== id);

  writeDB(data);

  res.json({ ok: true });
});

// Servidor
app.listen(3000, () => {
  console.log("Servidor funcionando en http://localhost:3000");
});
