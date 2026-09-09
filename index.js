// Carga variables de entorno desde el archivo .env
require("dotenv").config();

// Importar librerias

const express = require("express"); // Framework
const mysql = require("mysql2/promise"); // Acceso a la BD
const bodyParser = require("body-parser"); // Manejo de datos (JSON - FORM)
const PORT = process.env.PORT || 3000; // Puerto de escucha

// Helper
const { error, success } = require("./response.js");

// DTO
const ProductoDTO = require("./dto/ProductoDTO.js");

const app = express(); // Inicializar express
app.use(bodyParser.json()); // Formato de intercambio de datos

// =====================
// Conexion con mysql
// =====================

// Pool de conexiones a la BD
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  charset: process.env.DB_CHARSET,
});

// Verificar conexion
async function verificarConexion() {
  try {
    const connection = await pool.getConnection();

    console.log(`Conexión al Pool exitosa a la BD ${process.env.DB_NAME}`);
    
    connection.release(); // Liberar conexion
  } catch (err) {
    console.error("Error en la conexion al Pool: ", err);
  }
}

// Invocar la funcion para verificar la conexion
verificarConexion();

// Ahora cualquier error de await.pool.query() se puede capturar en el catch de cada endpoint


// =====================
// Endpoints - WS
// =====================

// *********
// CREAR
// *********

app.post("/productos", async (req, res) => {
  try {

    // Parametros de entrada / INPUT
    const producto = new ProductoDTO(req.body);

    // Validar datos
    const errorValidacion = producto.validar();

    // Si hay error de validacion, retornar error 400
    if (errorValidacion) {
      return error(res, errorValidacion, 400);
    }

    // Consulta SQL
    const sql = `
        INSERT INTO Productos (nombre, categoria, descripcion, garantia, precio, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar consulta
    const [result] = await pool.query(sql, [
      producto.nombre,
      producto.categoria,
      producto.descripcion,
      producto.garantia,
      producto.precio,
      producto.stock,
    ]);

    // Retornar respuesta 201 - OK
    return success(
      res,
      "Producto creado exitosamente",
      {
        id: result.insertId,
        nombre: producto.nombre,
        categoria: producto.categoria,
        descripcion: producto.descripcion,
        garantia: producto.garantia,
        precio: producto.precio,
        stock: producto.stock,
      },
      201
    );

  } catch (e) {
    console.error("Error MYSQL:", e);
    return error(res, "Error al crear el producto", 500);
  }
});

// ************
// ACTUALIZAR
// ************

app.put("/productos/:id", async (req, res) => {
  try {
    // Parametros de entrada / INPUT
    const { id } = req.params;

    const producto = new ProductoDTO(req.body);

    // Validar datos
    const errorValidacion = producto.validar();

    // Si hay error de validacion, retornar error 400
    if (errorValidacion) {
      return error(res, errorValidacion, 400);
    }

    // Consulta SQL
    const sql = `
              UPDATE Productos
              SET nombre = ?, 
              categoria = ?, 
              descripcion = ?, 
              garantia = ?, 
              precio = ?, 
              stock = ?,
              update_at = NOW()
              WHERE id = ?
          `;

    const [result] = await pool.query(sql, [
      producto.nombre,
      producto.categoria,
      producto.descripcion,
      producto.garantia,
      producto.precio,
      producto.stock,
      id,
    ]);

    if (result.affectedRows === 0)
      return error(res, "Registro no encontrado", 404);

    // Retornar respuesta 200
    return success(res, "Producto actualizado exitosamente", { id: id }, 200);
  } catch (err) {
    
    console.error("Error MYSQL", err);
    return error(res, "Error al actualizar el producto", 500);
  }
});

// ************
// LISTAR
// ************
app.get("/productos", async (req, res) => {
  try {
    // Consulta SQL
    const sql = `
          SELECT id, nombre, categoria, descripcion, garantia, precio, stock 
          FROM Productos ORDER BY id DESC
          LIMIT 10
          `;

    // Ejecutar consulta
    const [result] = await pool.query(sql);

    return success(res, "Productos listados exitosamente", result);
  } catch (err) {

    console.error("Error MYSQL:", err);
    return error(res, "Error al listar los productos", 500);
  }
});

// ************
// BUSCAR
// ************
app.get("/productos/:id", async (req, res) => {
  try {
    // Parametros de entrada / INPUT
    const { id } = req.params;

    // Consulta SQL
    const sql = `
              SELECT id, nombre, categoria, descripcion, garantia, precio, stock 
              FROM Productos 
              WHERE id = ?
          `;

    // Ejecutar consulta
    const [result] = await pool.query(sql, [id]);

    // Verificar si se encontro el registro
    if (result.length === 0) {
      return error(res, "Registro no encontrado", 404);
    }

    // Retornar respuesta 200
    return success(res, "Producto encontrado exitosamente", result[0]);
  } catch (err) {
    
    console.error("Error MYSQL:", err);
    return error(res, "Error al buscar el producto", 500);
  }
});

// ************
// ELIMINAR
// ************
app.delete("/productos/:id", async (req, res) => {
  try {
    // Parametros de entrada / INPUT
    const { id } = req.params;

    // Consulta SQL
    const sql = `
        DELETE FROM Productos
        WHERE id = ?
    `;

    const [result] = await pool.query(sql, [id]);

    if (result.affectedRows === 0) {
      return error(res, "Registro no encontrado", 404);
    }

    // Codigo 200 - OK
    return success(res, "Producto eliminado exitosamente", { id: id }, 200);
  } catch (err) {

    console.error("Error MYSQL:", err);
    return error(res, "Error al eliminar el producto", 500);
  }
});

// =====================
// Inicializar servidor
// =====================
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
