import { useState } from "react";
import { createUser } from "../../services/api";
import "./UserForm.css";

// Formulario para crear un usuario nuevo
const UserForm = ({ onUserCreated }) => {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createUser(form);
      setForm({ name: "", email: "" });
      onUserCreated(); // Le avisamos al padre que se creó un usuario
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;