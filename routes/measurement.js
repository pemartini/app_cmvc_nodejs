const errors = require('restify-errors');
//const Measurement = require('../models/MeasurementSet');
const axios = require('axios');

const xlsxFile = require('read-excel-file/node');

module.exports = server => {

server.post('/excel', async(req,res,next) => {
    xlsxFile('./Data.xlsx').then((rows) => {
        console.log(rows);
        console.table(rows);
       })
});

server.get('/meteo', async(req,res,next) => {
    axios.get('https://prociv.cm-viana-castelo.pt/arcgis/rest/services/Meteo/MeteoCMVC/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=OBJECTID%20ASC&resultOffset=0&resultRecordCount=5')
  .then(response => {
    res.json(response.data.features[0].attributes);
  })
  .catch(error => {
    console.log(error);
  });
});

}