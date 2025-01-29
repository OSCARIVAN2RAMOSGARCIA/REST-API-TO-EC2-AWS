const express = require("express");
const cors = require("cors");

const app = express();

// Configuración de CORS (origen flexible)
var corsOptions = {
    origin: "http://localhost:8081",  // Cambiar si el front-end usa otro puerto o dominio
};

// Usar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Usar el middleware de Express para manejar datos JSON y URL-encoded
app.use(express.json());  // Reemplaza bodyParser.json()
app.use(express.urlencoded({ extended: true }));  // Reemplaza bodyParser.urlencoded()

// Configuración de la base de datos (Sequelize)
const db = require("./app/models");

// Sincronización con la base de datos
db.sequelize.sync().then(() => {
    console.log("Database synced!");
}).catch((error) => {
    console.error("Error syncing database:", error);
});

// Ruta de prueba de la aplicación
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Oscar application" });
});

// Importar y usar las rutas de los tutoriales
require("./app/routes/tutorial.routes")(app);

// Configuración del puerto y lanzamiento del servidor
const PORT = process.env.PORT || 8080;
app.listen(8080, '0.0.0.0', () => {
    console.log("Servidor escuchando en el puerto 8080");
  });
  

// Manejo global de errores para solicitudes no encontradas
app.use((req, res, next) => {
    res.status(404).send({
        message: "Resource not found"
    });
});

// Manejo de errores no capturados (puedes agregar más detalles de errores si lo deseas)
app.use((err, req, res, next) => {
    console.error(err.stack);  // Log de errores en consola
    res.status(500).send({
        message: "Something went wrong! Please try again later."
    });
});
