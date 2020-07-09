const errors = require('restify-errors');
const Field = require('../models/Field');

module.exports = server => {
    //Get Fields
    server.get('/fields', async (req, res, next) => {
        try{
            const fields = await Field.find({});
            res.send(fields);
            next();
        } catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get Single Customer
    server.get('/fields/:id', async (req, res, next) => {
        try{
            const field = await Field.findById(req.params.id);
            res.send(field);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no fields with the id of ${req.params.id}`));
        }
    });

    //Add Customer
    server.post('/fields', async (req, res, next) => {
        //Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { name, unit, alias, recommended, warningMin, warningMax } = req.body;

        const field = new Field({
            name,
            unit,
            alias,
            recommended,
            warningMin,
            warningMax
        });

        try{
            const newField = await field.save();
            res.send(201);
            next();
        } catch(err){
            return next(new errors.InternalError(err.message));
        }
    });

    //Update Customer
    server.put('/fields/:id', async (req, res, next) => {
        //Check for JSON
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        try{
            const field = await Field.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
        } catch(err){
            return next(new errors.ResourceNotFoundError(`There is no field with the id of ${req.params.id}`));
        }
    });

    //Delete Customer
    server.del('/fields/:id', async (req, res, next) => {
        try{
            const field = await Field.findOneAndDelete({ _id : req.params.id });
            res.send(204);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError(`There is no field with the id of ${req.params.id}`));
        }
    });
}