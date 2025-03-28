const express = require("express");
const router = express.Router();
const { createMission, getAllMissions, updateMissionStatus, deleteMission, getMissionById } = require("../controllers/missionController");

router.post("/missions", createMission);
router.get("/missions", getAllMissions);
router.patch("/missions/:id", updateMissionStatus);
router.delete("/missions/:id", deleteMission);
router.get("/missions/:id", getMissionById);

module.exports = router;