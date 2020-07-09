const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SensorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    apiKey: {
        type: String,
        trim: true,
        required: true
    },
    isActive: {
        type: Number,
        default: 0
    },
    userId: {
        type: String,
        required: true
    },
    sensorType: {
        type: String,
        required: true
    },
    dangerState: {
        type: Number,
        default: 0
    }
});

SensorSchema.plugin(timestamp);

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = Sensor;