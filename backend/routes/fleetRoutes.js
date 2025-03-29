const express = require('express');
const router = express.Router();
const { getAllDrones, getDroneById, updateDroneStatus, getAvailableDrones } = require('../controllers/fleetController');

// Get all drones
router.get('/drones', getAllDrones);

// Get a specific drone by ID
router.get('/drones/:id', getDroneById);

// Update drone status
router.patch('/drones/:id', updateDroneStatus);

// Get available drones
router.get('/available', getAvailableDrones);

module.exports = router;