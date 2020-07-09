const errors = require('restify-errors');
const Polygon = require('../models/Polygon');

module.exports = server => {
    server.get('/polygon', async(req,res,next) => {
        try{
            const polygon = await Polygon.find({});
            res.send(polygon);
            next();
        }catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    server.get('/polygon/:id', async(req,res,next) => {
        try{
            const polygon= await Polygon.findById(req.params.id);
            res.send(polygon);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no polygon with the id of ${req.params.id}`));
        }
    });

    server.post('/polygon', async (req,res,next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }

        console.log(req.body);
        
        const { name, alias, polygonTypeId, floor, numCompartments, polygonSuperior, typology, area, climatization, dangerState, userId, publicFlag, location } = req.body;

        const polygon = new Polygon({
            name, alias, polygonTypeId, floor, numCompartments, polygonSuperior, typology, area, climatization, dangerState, userId, publicFlag, location
        });

        try{
            const newPolygon = await polygon.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    server.put('/polygon/:id', async(req,res,next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }
        try{
            const polygon = await Polygon.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError(`There is no polygon with the id of ${req.params.id}`));
        }
    });

    server.del('/polygon/:id', async (req, res, next) => {
        try{
            const polygon = await Polygon.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no polygon with the id of ${req.params.id}`));
        }
    });
}