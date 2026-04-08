const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./config/database");

const userRoutes = require("./routes/userRoutes");
const missionRoutes = require("./routes/missionRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Se crea las tablas si no existen al iniciar el servidor
initializeDatabase();

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/ai", aiRoutes);

//Ruta para verificar que el servidor está vivo
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

module.exports = app;