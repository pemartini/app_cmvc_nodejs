const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const polygonSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["Polygon"]
    },
    coordinates: {
      type: [[[Number]]],
      default: undefined
    }
  });

var PolygonSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: true
      },
      alias: {
        type: String,
        trim: true
      },
      polygonTypeId: {
        type: String
      },
      polygonSuperior: {
        type: String
      },
      floor: {
        type: Number
      },
      numCompartments: {
        type: Number
      },
      typology: {
        type: String
      },
      area: {
        type: Number
      },
      climatization: {
        type: Number,
        default: 0
      },
      dangerState: {
        type: Number,
        default: 0
      },
      userId : {
        type : String
      },
      publicFlag : {
        type: Number,
        default: 0
      },
      location: {
        type: polygonSchema,
        required: true
      }
    });
  
    PolygonSchema.plugin(timestamp);
    PolygonSchema.index({location : '2dsphere'});
    
    const Polygon = mongoose.model('Polygon', PolygonSchema);

    module.exports = Polygon;