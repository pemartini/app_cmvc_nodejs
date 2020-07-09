const errors = require('restify-errors');
const PolygonType = require('../models/PolygonType');

module.exports = server => {
    //Get polygontype
    server.get('/polygontype', async (req, res, next) => {
        try{
            const polygontype = await PolygonType.find({});
            res.send(polygontype);
            next();
        }
        catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get Single polygontype
    server.get('/polygontype/:id', async (req, res, next) => {
        try{    
            const polygontype = await PolygonType.findById(req.params.id);
            res.send(polygontype);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError(`There is no polygon type with the id of ${req.params.id}`));
        }
    });

    //Add polygontype
    server.post('/polygontype', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }

        const { name } = req.body;

        const polygontype = new PolygonType({
            name
        });

        try{
            const newPolygonType = await polygontype.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    //Update sensortype
    server.put('/polygontype/:id', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try{
            const polygontype = await PolygonType.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no polygon type with the id of ${req.params.id}`));
        }
    });

    //Delete polygontype
    server.del('/polygontype/:id', async (req, res, next) => {
        try{
            const polygontype = await PolygonType.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        } catch(err){
            return next (new errors.ResourceNotFoundError(`There is no polygon type with the id of ${req.params.id}`));
        }
    });
}