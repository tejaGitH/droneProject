const Mission = require("../models/Mission");

// Create a new mission
exports.createMission = async (req, res) => {
    const { name, areaCoordinates } = req.body;

    try {
        const newMission = new Mission({ name, areaCoordinates });
        await newMission.save();
        res.status(201).json(newMission);
    } catch (error) {
        res.status(400).json({ error: "Error creating mission" });
        console.error("Error creating mission:", error);
    }
};

// Get all missions
exports.getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.find();
        res.json(missions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching missions", error: error.message });
        console.error("Error fetching missions:", error);
    }
};

// Update mission status
// Update mission status
exports.updateMissionStatus = async (req, res) => {
    const { id } = req.params;

    try {
        const mission = await Mission.findById(id);
        if (!mission) {
            return res.status(404).json({ error: "Mission not found" });
        }

        // Toggle the status
        mission.status = mission.status === 'Completed' ? 'Pending' : 'Completed';
        await mission.save();

        res.json(mission);
    } catch (error) {
        res.status(400).json({ error: "Error updating mission status" });
        console.error("Error updating mission status:", error);
    }
};

exports.deleteMission = async (req, res) => {
    const { id } = req.params;
    try {
        await Mission.findByIdAndDelete(id);
        res.json({message: "Mission deleted successfully"});
    }catch(error){
        res.status(400).json({error: "Error deleting mission", error: error.message});
        console.error("Error deleting mission:", error);
    }
};

exports.getMissionById = async (req, res) => {
    const { id } = req.params;
    try {
        const mission = await Mission.findById(id);
        if(!mission){
            return res.status(404).json({error: "Mission not found"});
        }
        res.json(mission);
    }catch(error){
        res.status(400).json({error: "Error fetching mission by id", error: error.message});
        console.error("Error fetching mission by id:", error);
    }
};