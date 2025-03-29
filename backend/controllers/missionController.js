
// Mission Controller (controllers/missionController.js)
const Mission = require('../models/Mission');

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
