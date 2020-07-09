const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SensorTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    }
});

SensorTypeSchema.plugin(timestamp);

const SensorType = mongoose.model('SensorType', SensorTypeSchema);

module.exports = SensorType;