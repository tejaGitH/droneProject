const Drone = require('../models/Drone');

// Fetch all drones
exports.getAllDrones = async (req, res) => {
    try {
        const drones = await Drone.find();
        res.json(drones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching drones' });
    }
};

// Fetch a specific drone by ID
exports.getDroneById = async (req, res) => {
    try {
        const drone = await Drone.findOne({ droneId: req.params.id });
        if (!drone) return res.status(404).json({ error: 'Drone not found' });
        res.json(drone);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching drone data' });
    }
};

// Update drone status
exports.updateDroneStatus = async (req, res) => {
    try {
        const { status, coordinates, batteryLevel } = req.body;
        const drone = await Drone.findOne({ droneId: req.params.id });
        if (!drone) return res.status(404).json({ error: 'Drone not found' });

        drone.status = status || drone.status;
        if (coordinates) {
            drone.coordinates = coordinates;
        }
        if (batteryLevel !== undefined) {
            drone.batteryLevel = batteryLevel;
        }
        drone.lastUpdate = Date.now();
        await drone.save();

        res.json(drone);
    } catch (error) {
        res.status(400).json({ error: 'Error updating drone data' });
    }
};