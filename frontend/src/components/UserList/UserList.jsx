import { useEffect, useState } from "react";
import { getUsers } from "../../services/api";
import "./UserList.css";

// Lista de usuarios registrados en el sistema
const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cada vez que el padre nos avisa de un nuevo usuario, recargamos la lista
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch {
        console.error("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  if (loading) return <p className="loading-text">Cargando usuarios...</p>;

  return (
    <div className="card">
      <h2>Usuarios ({users.length})</h2>
      {users.length === 0 ? (
        <p className="empty-text">No hay usuarios registrados aún.</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;