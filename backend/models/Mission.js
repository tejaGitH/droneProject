const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    areaCoordinates: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;