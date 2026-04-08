const { db } = require("../config/database");

const getMissions = (req, res) => {
  const missions = db
    .prepare("SELECT * FROM missions ORDER BY created_at DESC")
    .all();
  res.json(missions);
};

const createMission = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const result = db
    .prepare("INSERT INTO missions (title, description) VALUES (?, ?)")
    .run(title, description);

  const newMission = db
    .prepare("SELECT * FROM missions WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newMission);
};

const assignMission = (req, res) => {
  const { userId, missionId } = req.body;

  if (!userId || !missionId) {
    return res.status(400).json({ error: "userId and missionId are required" });
  }

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
  const mission = db.prepare("SELECT * FROM missions WHERE id = ?").get(missionId);

  if (!user) return res.status(404).json({ error: "User not found" });
  if (!mission) return res.status(404).json({ error: "Mission not found" });

  const existing = db
    .prepare("SELECT * FROM user_missions WHERE user_id = ? AND mission_id = ?")
    .get(userId, missionId);

  if (existing) {
    return res.status(400).json({ error: "Mission already assigned to this user" });
  }

  const result = db
    .prepare("INSERT INTO user_missions (user_id, mission_id) VALUES (?, ?)")
    .run(userId, missionId);

  res.status(201).json({
    id: result.lastInsertRowid,
    userId,
    missionId,
    message: `Mission "${mission.title}" assigned to "${user.name}"`,
  });
};

const getAssignments = (req, res) => {
  const assignments = db
    .prepare(`
      SELECT 
        um.id,
        u.name AS user_name,
        u.email AS user_email,
        m.title AS mission_title,
        m.description AS mission_description,
        m.status AS mission_status,
        um.assigned_at
      FROM user_missions um
      JOIN users u ON um.user_id = u.id
      JOIN missions m ON um.mission_id = m.id
      ORDER BY um.assigned_at DESC
    `)
    .all();

  res.json(assignments);
};

module.exports = { getMissions, createMission, assignMission, getAssignments };