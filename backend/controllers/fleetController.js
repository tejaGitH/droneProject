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
        console.log("Request Payload:", req.body);
        const { status, coordinates, batteryLevel } = req.body;

        const drone = await Drone.findOne({ droneId: req.params.id });

        if (!drone) {
            return res.status(404).json({ error: 'Drone not found' });
        }

        console.log("Found Drone:", drone);

        // Preserve the model field
        const updatedData = {
            status: status || drone.status,
            coordinates: coordinates || drone.coordinates,
            batteryLevel: batteryLevel !== undefined ? batteryLevel : drone.batteryLevel,
            lastUpdate: Date.now(),
            model: drone.model, // Ensure the model is included
        };

        const updatedDrone = await Drone.findOneAndUpdate(
            { droneId: req.params.id },
            updatedData,
            { new: true, runValidators: true } // runValidators ensures required fields are checked
        );

        console.log("Updated Drone:", updatedDrone);
        res.json(updatedDrone);
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};


// Fetch available drones
exports.getAvailableDrones = async (req, res) => {
    try {
        const availableDrones = await Drone.find({ status: 'Available' });
        res.json(availableDrones);
        console.log(availableDrones);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching available drones' });
    }
};