const errors = require('restify-errors');
const SensorType = require('../models/SensorType');

module.exports = server => {
    //Get Typology
    server.get('/sensortype', async (req, res, next) => {
        try{
            const sensortype = await SensorType.find({});
            res.send(sensortype);
            next();
        }
        catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get Single sensortype
    server.get('/sensortype/:id', async (req, res, next) => {
        try{    
            const sensortype = await SensorType.findById(req.params.id);
            res.send(sensortype);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError(`There is no sensor type with the id of ${req.params.id}`));
        }
    });

    //Add sensortype
    server.post('/sensortype', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }
        
        const { name, category } = req.body;

        const sensortype = new SensorType({
            name, category
        });

        try{
            const newSensorType = await sensortype.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    //Update sensortype
    server.put('/sensortype/:id', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try{
            const sensortype = await SensorType.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no sensor type with the id of ${req.params.id}`));
        }
    });

    //Delete sensortype
    server.del('/sensortype/:id', async (req, res, next) => {
        try{
            const sensortype = await SensorType.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        } catch(err){
            return next (new errors.ResourceNotFoundError(`There is no sensor type with the id of ${req.params.id}`));
        }
    });
}