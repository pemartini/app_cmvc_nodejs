const errors = require('restify-errors');
const Sensor = require('../models/Sensor');
const SensorType = require('../models/SensorType');

module.exports = server => {
    //Get Sensors
    server.get('/sensor', async (req, res, next) => {
        try{
            const sensor = await Sensor.find({});
            res.send(sensor);
            next();
        }catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get Single
    server.get('/sensor/:id', async(req,res,next) => {
        try{
            const sensor = await Sensor.findById(req.params.id);
            res.send(sensor);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no sensor with the id of ${req.params.id}`));
        }
    });

    //Add Sensor
    server.post('/sensor', async(req,res,next) => {
        console.log(req.body);
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        const { name, apiKey, isActive, userId, sensorType, dangerState } = req.body;
        const sensor = new Sensor({
            name,
            apiKey,
            isActive,
            userId,
            sensorType,
            dangerState
        });

        try {
            const newSensor = await sensor.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    //Update Sensor
    server.put('/sensor/:id', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try{
            const sensor = await Sensor.findOneAndUpdate({ _id : req.params.id}, req.body)
            res.send(200);
            next();
        }catch(err){
            return (new errors.ResourceNotFoundError(`There is no sensor with the id of ${req.params.id}`));
        }
    });

    //Delete Sensor
    server.del('/sensor/:id', async (req, res, next) => {
        try{
            const sensor = await Sensor.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        }catch(err){
            return next (new errors.ResourceNotFoundError(`There is no sensor with the id of ${req.params.id}`));
        }
    });

    //Get Sensor By Owner
    server.get('/sensor/user/:id', async (req, res, next) => {
        try {
            const sensor = await Sensor.find({ userId : req.params.id});
            res.send(sensor);
            next();
        }catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Check if sensor exists
    server.post("/sensorCheck", async (req, res, next) => {
        try{
            const sensor = await Sensor.findOne({apiKey : req.body.addKey});
            if(sensor){
                res.send(false).status(200);
            }else{
                res.send(true).status(204);
            }
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no email with the email of ${req.body.addKey}`));
        }
    });

}