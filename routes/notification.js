const errors = require('restify-errors');
const Notification = require('../models/Notification');

module.exports = server => {
    server.get('/notification', async(req,res,next) => {
        try{
            const notifications = await Notification.find({});
            res.send(notifications);
            next();
        }catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    server.get('/notification/:id', async(req,res,next) => {
        try{
            const notification = await Notification.findById(req.params.id);
            res.send(notification);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no notification with the id of ${req.params.id}`));
        }
    });

    server.post('/notification', async(req,res,next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }

        const { coordinates, message, type, userId, sensorId, checked } = req.body;

        const notification = new Notification({
            coordinates, message, type, userId, sensorId, checked
        });

        try{
            const newNotification = await notification.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    server.put('/notification/:id', async(req,res,next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }

        try{
            const notification = await Notification.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no notification with the id of ${req.params.id}`));
        }
    });

    server.del('/notification/:id', async (req, res, next) => {
        try { 
            const notification = await Notification.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no notification with the id of ${req.params.id}`));
        }
    });
}