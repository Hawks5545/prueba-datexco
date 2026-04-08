const express = require("express");
const { generateInvitation, improveMissionDescription } = require("../controllers/aiController");

const router = express.Router();

router.post("/invite", generateInvitation);
router.post("/improve", improveMissionDescription);

module.exports = router;