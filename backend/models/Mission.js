// Mission Model (models/Mission.js)
const mongoose = require('mongoose');

const coordinateSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    coordinates: { type: [coordinateSchema], required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Mission = mongoose.model('Mission', missionSchema);
module.exports = Mission;
