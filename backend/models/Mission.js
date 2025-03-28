const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    areaCoordinates: { type: Array, required: true },  // Updated to Array
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;