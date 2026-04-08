require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

// Arrancamos el servidor en el puerto definido en el .env

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});