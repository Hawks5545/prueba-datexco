import { useState } from "react";
import { createMission, improveDescription } from "../../services/api";
import "./MissionForm.css";

// Formulario para crear una misión nueva
const MissionForm = ({ onMissionCreated }) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [improving, setImproving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createMission(form);
      setForm({ title: "", description: "" });
      onMissionCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la misión");
    } finally {
      setLoading(false);
    }
  };

  // Le pedimos a la AI que mejore la descripción antes de guardar
  const handleImprove = async () => {
    if (!form.description.trim()) return;
    setImproving(true);

    try {
      const res = await improveDescription(form.description);
      setForm({ ...form, description: res.data.improved });
    } catch {
      setError("Error al mejorar la descripción");
    } finally {
      setImproving(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear Misión</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título de la misión"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Descripción de la misión"
          value={form.description}
          onChange={handleChange}
          required
          rows={3}
        />
        {error && <p className="error">{error}</p>}
        <div className="button-group">
          <button
            type="button"
            className="secondary"
            onClick={handleImprove}
            disabled={improving || !form.description.trim()}
          >
            {improving ? "Mejorando..." : "✨ Mejorar con AI"}
          </button>
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Misión"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MissionForm;