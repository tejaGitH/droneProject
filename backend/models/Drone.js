const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
    droneId: { type: String, required: true, unique: true },
    model: { type: String },
    status: { type: String, default: 'Available' }, // Add status field
    batteryLevel: { type: Number, default: 100 },
    coordinates: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 },
    },
    lastUpdate: { type: Date, default: Date.now },
});

const Drone = mongoose.model('Drone', droneSchema);
module.exports = Drone;