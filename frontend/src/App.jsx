import { useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import UserList from "./components/UserList/UserList";
import MissionForm from "./components/MissionForm/MissionForm";
import MissionList from "./components/MissionList/MissionList";
import AssignMission from "./components/AssignMission/AssignMission";
import "./App.css";

// Componente raíz que une todos los módulos de la app
const App = () => {
  // Estos contadores los usamos para forzar la recarga de las listas
  // cuando se crea un nuevo usuario o misión
  const [userRefresh, setUserRefresh] = useState(0);
  const [missionRefresh, setMissionRefresh] = useState(0);

  const handleUserCreated = () => setUserRefresh((prev) => prev + 1);
  const handleMissionCreated = () => setMissionRefresh((prev) => prev + 1);

  return (
    <div className="app">
      <header className="app-header">
        <h1> Gestor de Misiones</h1>
        <p>Administra usuarios, misiones y asignaciones de tu comunidad</p>
      </header>

      <main className="app-grid">
        {/* Columna izquierda: usuarios */}
        <section className="column">
          <UserForm onUserCreated={handleUserCreated} />
          <UserList refresh={userRefresh} />
        </section>

        {/* Columna derecha: misiones */}
        <section className="column">
          <MissionForm onMissionCreated={handleMissionCreated} />
          <MissionList refresh={missionRefresh} />
        </section>

        {/* Sección completa: asignaciones */}
        <section className="column full-width">
          <AssignMission refresh={userRefresh + missionRefresh} />
        </section>
      </main>
    </div>
  );
};

export default App;