const errors = require('restify-errors');
//const Measurement = require('../models/MeasurementSet');

const xlsxFile = require('read-excel-file/node');

module.exports = server => {

server.post('/excel', async(req,res,next) => {
    xlsxFile('./Data.xlsx').then((rows) => {
        console.log(rows);
        console.table(rows);
       })
});

}