const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const TypologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

TypologySchema.plugin(timestamp);

const Typology = mongoose.model('Typology', TypologySchema);

module.exports = Typology;