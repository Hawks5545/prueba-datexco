import axios from "axios";

// Todas las peticiones al backend pasan por aquí
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Usuarios
export const getUsers = () => api.get("/users");
export const createUser = (data) => api.post("/users", data);

// Misiones
export const getMissions = () => api.get("/missions");
export const createMission = (data) => api.post("/missions", data);
export const assignMission = (data) => api.post("/missions/assign", data);
export const getAssignments = () => api.get("/missions/assignments");

// AI
export const generateInvitation = (missionId) =>
  api.post("/ai/invite", { missionId });
export const improveDescription = (description) =>
  api.post("/ai/improve", { description });