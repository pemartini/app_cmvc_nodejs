const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      default: undefined
    }
  });

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    userId: {
        type: String,
        trim: true,
        required: true
    },
    sensorId: {
        type: String,
        trim: true,
        required: true
    },
    checked: {
        type: Number,
        default: 0
    },
    location: {
        type: pointSchema,
        required: true
    }
});

NotificationSchema.plugin(timestamp);
NotificationSchema.index({location : '2dsphere'})

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;