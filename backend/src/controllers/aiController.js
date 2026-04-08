const { generateInvitationMessage, improveDescription } = require("../services/aiService");
const { db } = require("../config/database");

const generateInvitation = async (req, res) => {
  const { missionId } = req.body;

  if (!missionId) {
    return res.status(400).json({ error: "missionId is required" });
  }

  const mission = db.prepare("SELECT * FROM missions WHERE id = ?").get(missionId);

  if (!mission) {
    return res.status(404).json({ error: "Mission not found" });
  }

  try {
    const invitation = await generateInvitationMessage(mission.title, mission.description);
    res.json({ invitation });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate invitation" });
  }
};

const improveMissionDescription = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const improved = await improveDescription(description);
    res.json({ improved });
  } catch (error) {
    res.status(500).json({ error: "Failed to improve description" });
  }
};

module.exports = { generateInvitation, improveMissionDescription };
