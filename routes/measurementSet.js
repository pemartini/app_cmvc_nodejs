const errors = require('restify-errors');
const MeasurementSet = require('../models/MeasurementSet');

module.exports = server => {

    server.get('/measurementset', async (req, res, next) => {
     try{
        const measurementset = await MeasurementSet.find({});
        res.send(measurementset);
        next();
     }catch(err){
        return next(new errors.InvalidContentError(err));
     }
    });

    server.get('/measurementset/:id', async (req, res, next) => {
       try{
        const measurementset = await MeasurementSet.findById(req.params.id);
        res.send(measurementset);
        next();
       }catch(err){
        return next(new errors.ResourceNotFoundError(`There is no measurement set with the id of ${req.params.id}`));
       } 
    });

    server.del('/measurementset/:id', async(req, res, next) => {
        try{
            const measurementset = await MeasurementSet.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no measurement set with the id of ${req.params.id}`));
        }
    });

    server.put('/measurementset/:id', async(req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }
        try{
            const measurementset = await MeasurementSet.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no measurement set with the id of ${req.params.id}`));
        }
    });

    server.post('/measurementset', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }
        const { polygonId, sensorId, startTimestamp, endTimestamp, description, dangerState, location } = req.body;

        const measurementset = new MeasurementSet({
            polygonId, sensorId, startTimestamp, endTimestamp, description, dangerState, location
        });

        try{
            const newMeasurementSet = await measurementset.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    //Get Active MeasurementSet
    server.get('/measurementset/get/active', async (req, res, next) => {
        try{
            const measurementset = await MeasurementSet.find({ endTimestamp : { $exists : false }});
            res.send(measurementset);
            next();
         }catch(err){
            return next(new errors.InvalidContentError(err));
         }
    });

}