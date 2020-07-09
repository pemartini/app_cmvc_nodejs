const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const FieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        trim: true
    },
    recommended: {
        type: Number,
        default: 0
    },
    warningMin: {
        type: Number
    },
    warningMax: {
        type: Number
    }
});

FieldSchema.plugin(timestamp);

const Field = mongoose.model('Field', FieldSchema);

module.exports = Field;