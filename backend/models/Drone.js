const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    droneId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    status: { type: String, default: 'Available' }, // Available, In Mission, Maintenance
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    batteryLevel: { type: Number, default: 100 }, // Percentage (0-100)
    lastUpdate: { type: Date, default: Date.now }
});

const Drone = mongoose.model('Drone', droneSchema);
module.exports = Drone;