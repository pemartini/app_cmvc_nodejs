const errors = require('restify-errors');

const Influx = require('influx');
//const Measurement = require('../models/MeasurementSet');
const axios = require('axios');

const xlsxFile = require('read-excel-file/node');

module.exports = server => {

const influx = new Influx.InfluxDB({
  host: "localhost",
  database: "IoTViana",
  schema: [
    {
      measurement: "meteo",
      fields: {
        field0: Influx.FieldType.FLOAT,
        field1: Influx.FieldType.FLOAT,
        field2: Influx.FieldType.FLOAT,
        field3: Influx.FieldType.FLOAT,
        field4: Influx.FieldType.FLOAT,
        field5: Influx.FieldType.FLOAT,
        field6: Influx.FieldType.FLOAT,
        field7: Influx.FieldType.FLOAT,
        field8: Influx.FieldType.FLOAT,
        field9: Influx.FieldType.FLOAT,
        field10: Influx.FieldType.FLOAT,
        field11: Influx.FieldType.FLOAT,
        field12: Influx.FieldType.FLOAT,
        field13: Influx.FieldType.FLOAT,
        field14: Influx.FieldType.FLOAT,
        field15: Influx.FieldType.FLOAT
      },
      tags: ["sensorId"]
    }
  ]
});

server.post('/excel', async(req,res,next) => {
    xlsxFile('./Data.xlsx').then((rows) => {
        console.log(rows);
        console.table(rows);
       })
});

server.get('/meteo', async(req,res,next) => {
  axios.get('https://prociv.cm-viana-castelo.pt/arcgis/rest/services/Meteo/MeteoCMVC/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID%20ASC&resultOffset=0&resultRecordCount=5')
    .then(response => {
    const dr = response.data.features[0].attributes;
    console.log(dr);
    influx
    .writePoints([
      {
        measurement: "measurement",
        tags: {
          sensorId: dr["idSensor"]
        },
        fields: {
           field0: dr["AIRD"],
           field1: dr["WV"],
           field2: dr["HUMB"],
           field3: dr["HEATI"],
           field4: dr["WCHILL"],
           field5: dr["ANE_AVG"],
           field6: dr["ANE_GUST"],
           field7: dr["BAT"],
           field8: dr["DEWP"],
           field9: dr["PLV1"],
           field10: dr["PLV3"],
           field11: dr["ATM"],
           field12: dr["RAD"],
           field13: dr["TCB"],
           field14: dr["WBULB"],
           field15: dr["ANE"]
        }
      }
    ])
    .catch(err => {
      console.error(`Error saving data to InfluxDB! ${err.stack}`);
    });
    })
    .catch(error => {
      console.log(error);
  });
});

}