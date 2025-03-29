
// Mission Controller (controllers/missionController.js)
const Mission = require('../models/Mission');
const Drone = require('../models/Drone');

// Create Mission
exports.createMission = async (req, res) => {
    try {
        const { name, coordinates } = req.body;
        const newMission = new Mission({ name, coordinates });
        await newMission.save();
        res.status(201).json(newMission);
    } catch (error) {
        res.status(400).json({ error: 'Error creating mission' });
    }
};

// Get All Missions
exports.getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.find();
        res.json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching missions' });
    }
};

// Get Mission by ID
exports.getMissionById = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);
        if (!mission) return res.status(404).json({ error: 'Mission not found' });
        res.json(mission);
    } catch (error) {
        res.status(400).json({ error: 'Error fetching mission' });
    }
};

// Update Mission Status
exports.updateMissionStatus = async (req, res) => {
    try {
        const mission = await Mission.findById(req.params.id);
        if (!mission) return res.status(404).json({ error: 'Mission not found' });
        mission.status = mission.status === 'Completed' ? 'Pending' : 'Completed';
        await mission.save();
        res.json(mission);
    } catch (error) {
        res.status(400).json({ error: 'Error updating mission status' });
    }
};

// Delete Mission
exports.deleteMission = async (req, res) => {
    try {
        await Mission.findByIdAndDelete(req.params.id);
        res.json({ message: 'Mission deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting mission' });
    }
};


exports.assignDroneToMission = async (req, res) => {
    try {
        const { droneId } = req.body;
        const mission = await Mission.findById(req.params.id);

        if (!mission) return res.status(404).json({ error: 'Mission not found' });

        // Check if the drone is available
        const drone = await Drone.findOne({ _id: droneId, status: 'available' });
        if (!drone) return res.status(400).json({ error: 'Drone not available' });

        // Assign the drone and update statuses
        mission.assignedDrone = drone._id;
        mission.status = 'In-Progress';
        drone.status = 'in-mission';

        await mission.save();
        await drone.save();

        res.json({ message: 'Drone assigned successfully', mission });
    } catch (error) {
        res.status(400).json({ error: 'Error assigning drone to mission' });
    }
};