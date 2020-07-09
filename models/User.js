const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required : true
    },
    contact: {
        type: Number
    },
    permissionLevel: {
        type: Number,
        default: 0
    }
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);

module.exports = User;