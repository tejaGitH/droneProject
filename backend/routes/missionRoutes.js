const express = require("express");
const router = express.Router();
const { createMission, getAllMissions, updateMissionStatus, deleteMission, getMissionById ,assignDroneToMission} = require("../controllers/missionController");

// Create a new mission
router.post("/missions", createMission);

// Get all missions
router.get("/missions", getAllMissions);

// Update mission status
router.patch("/missions/:id", updateMissionStatus);

// Delete mission
router.delete("/missions/:id", deleteMission);

// Get a specific mission by ID
router.get("/missions/:id", getMissionById);

// Assign a drone to a mission
router.post("/:id/assign-drone", assignDroneToMission);

module.exports = router;
