const errors = require('restify-errors');
const Typology = require('../models/Typology');

module.exports = server => {
    //Get Typology
    server.get('/typology', async (req, res, next) => {
        try{
            const typology = await Typology.find({});
            res.send(typology);
            next();
        }
        catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get Single Typology
    server.get('/typology/:id', async (req, res, next) => {
        console.log(req.params.id);
        try{    
            const typology = await Typology.findById(req.params.id);
            res.send(typology);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError(`There is no typology with the id of ${req.params.id}`));
        }
    });

    //Add Typology
    server.post('/typology', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json"));
        }

        const { name } = req.body;

        const typology = new Typology({
            name
        });

        try{
            const newTypology = await typology.save();
            res.send(201);
            next();
        }catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    //Update Typology
    server.put('/typology/:id', async (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try{
            const typology = await Typology.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no typology with the id of ${req.params.id}`));
        }
    });

    //Delete Typology
    server.del('/typology/:id', async (req, res, next) => {
        try{
            const typology = await Typology.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        } catch(err){
            return next (new errors.ResourceNotFoundError(`There is no typology with the id of ${req.params.id}`));
        }
    });
}