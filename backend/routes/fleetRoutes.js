const express = require('express');
const router = express.Router();
const { getAllDrones, getDroneById, updateDroneStatus } = require('../controllers/fleetController');

// Get all drones
router.get('/drones', getAllDrones);

// Get a specific drone by ID
router.get('/drones/:id', getDroneById);

// Update drone status
router.patch('/drones/:id', updateDroneStatus);

module.exports = router;