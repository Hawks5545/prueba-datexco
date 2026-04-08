const express = require("express");
const {
  getMissions,
  createMission,
  assignMission,
  getAssignments,
} = require("../controllers/missionController");

const router = express.Router();

router.get("/", getMissions);
router.post("/", createMission);
router.post("/assign", assignMission);
router.get("/assignments", getAssignments);

module.exports = router;