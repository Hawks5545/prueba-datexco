import { useState, useEffect } from "react";
import { getUsers, getMissions, assignMission, getAssignments } from "../../services/api";
import "./AssignMission.css";

// Componente para asignar una misión a un usuario y ver las asignaciones existentes
const AssignMission = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [missions, setMissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ userId: "", missionId: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Cargamos usuarios, misiones y asignaciones al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, missionsRes, assignmentsRes] = await Promise.all([
          getUsers(),
          getMissions(),
          getAssignments(),
        ]);
        setUsers(usersRes.data);
        setMissions(missionsRes.data);
        setAssignments(assignmentsRes.data);
      } catch {
        console.error("Error al cargar datos");
      }
    };

    fetchData();
  }, [refresh]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await assignMission({
        userId: Number(form.userId),
        missionId: Number(form.missionId),
      });
      setSuccess(res.data.message);
      setForm({ userId: "", missionId: "" });

      // Recargamos las asignaciones después de crear una nueva
      const assignmentsRes = await getAssignments();
      setAssignments(assignmentsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error al asignar la misión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Asignar Misión</h2>
      <form onSubmit={handleSubmit}>
        <select name="userId" value={form.userId} onChange={handleChange} required>
          <option value="">Seleccionar usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select name="missionId" value={form.missionId} onChange={handleChange} required>
          <option value="">Seleccionar misión</option>
          {missions.map((mission) => (
            <option key={mission.id} value={mission.id}>
              {mission.title}
            </option>
          ))}
        </select>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Asignando..." : "Asignar Misión"}
        </button>
      </form>

      {/* Tabla con todas las asignaciones actuales */}
      {assignments.length > 0 && (
        <div className="assignments-table">
          <h3>Asignaciones actuales</h3>
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Misión</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td>{a.user_name}</td>
                  <td>{a.mission_title}</td>
                  <td>
                    <span className={`mission-status ${a.mission_status}`}>
                      {a.mission_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignMission;