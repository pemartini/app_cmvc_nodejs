const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const PolygonTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

PolygonTypeSchema.plugin(timestamp);

const PolygonType = mongoose.model('PolygonType', PolygonTypeSchema);

module.exports = PolygonType;