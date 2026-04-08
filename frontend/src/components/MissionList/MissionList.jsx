import { useEffect, useState } from "react";
import { getMissions, generateInvitation } from "../../services/api";
import "./MissionList.css";

// Lista de misiones creadas en el sistema
const MissionList = ({ refresh }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState({ missionId: null, text: "" });
  const [generating, setGenerating] = useState(false);

  // Recargamos las misiones cada vez que el padre nos avisa de una nueva
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await getMissions();
        setMissions(res.data);
      } catch {
        console.error("Error al cargar misiones");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, [refresh]);

  // Generamos un mensaje de invitación para la misión seleccionada
  const handleGenerateInvitation = async (missionId) => {
    setGenerating(true);
    setInvitation({ missionId, text: "" });

    try {
      const res = await generateInvitation(missionId);
      setInvitation({ missionId, text: res.data.invitation });
    } catch {
      console.error("Error al generar invitación");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <p className="loading-text">Cargando misiones...</p>;

  return (
    <div className="card">
      <h2>Misiones ({missions.length})</h2>
      {missions.length === 0 ? (
        <p className="empty-text">No hay misiones creadas aún.</p>
      ) : (
        <ul className="mission-list">
          {missions.map((mission) => (
            <li key={mission.id} className="mission-item">
              <div className="mission-header">
                <span className="mission-title">{mission.title}</span>
                <span className={`mission-status ${mission.status}`}>
                  {mission.status}
                </span>
              </div>
              <p className="mission-description">{mission.description}</p>
              <button
                className="invite-btn"
                onClick={() => handleGenerateInvitation(mission.id)}
                disabled={generating && invitation.missionId === mission.id}
              >
                {generating && invitation.missionId === mission.id
                  ? "Generando..."
                  : "✨ Generar invitación"}
              </button>
              {invitation.missionId === mission.id && invitation.text && (
                <div className="invitation-box">
                  <p>{invitation.text}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MissionList;