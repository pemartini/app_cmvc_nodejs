const mongoose = require("mongoose");
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

var MeasurementSetSchema = new mongoose.Schema(
  {
    polygonId: {
      type: String
    },
    sensorId: {
      type: String,
      required: true
    },
    startTimestamp: {
      type: Date
    },
    endTimestamp: {
      type: Date
    },
    description: {
      type: String,
      trim: true
    },
    dangerState : {
      type : Number,
      default : 0
    },
    location: {
      type: pointSchema,
      required: true
    }
  });

MeasurementSetSchema.plugin(timestamp);
MeasurementSetSchema.index({location: "2dsphere"});

const MeasurementSet = mongoose.model('MeasurementSet', MeasurementSetSchema);

module.exports = MeasurementSet;
