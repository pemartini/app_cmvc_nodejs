const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
    //Get Users
    server.get('/users', async(req,res,next) => {
        try{
            const users = await User.find({});
            res.send(users);
            next();
        }catch(err){
            return next(new errors.InvalidContentError(err));
        }
    });

    //Get a Single User
    server.get('/users/:id', async (req,res,next) => {
        try {
            const user = await User.findById(req.params.id);
            res.send(user);
            next();
        }
        catch(err){
            return next(new errors.ResourceNotFoundError(`There is not user with the id of ${req.params.id}`));
        }
    });

    // Update User
    server.put('/users/:id', (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }
        try{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                  req.body.password = hash;
                  const user = await User.findOneAndUpdate({ _id : req.params.id }, req.body);
            res.send(200);
            next();
            });
        });
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no user with the id of ${req.params.id}`));
        }
    });

        //Delete User
        server.del('/users/:id', async (req, res, next) => {
            try{
                const user = await User.findOneAndDelete({ _id : req.params.id });
                res.send(204);
                next();
            }
            catch(err){
                return next(new errors.ResourceNotFoundError(`There is no user with the id of ${req.params.id}`));
            }
        });

    //Register User
    server.post('/register', (req, res, next) => {
        if(!req.is('application/json')){
            return next(new errors.InvalidContentError("Expects 'application/json'"));
        }

        const { email, password, name, contact, permissionLevel } = req.body;

        const user = new User({
            email,
            password,
            name,
            contact,
            permissionLevel
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, async (err, hash) => {
                //Hash password
                user.password = hash;
                //Save User
                try{
                    const newUser = await user.save();
                    res.send(201);
                    next();
                } catch(err){
                    return next(new errors.InternalError(err.message));
                }
            });
        });
    });

    //Auth user
    server.post('/auth', async (req, res, next) => {
        const { email, password } = req.body;
        try{
            // Authenticate User
            const user = await auth.authenticate(email, password);
            
            // Create JWT
            const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
                expiresIn : '45m'
            });

            const perm = user.permissionLevel;
            const { iat, exp } = jwt.decode(token);
            // Responde with token
            res.send({ iat, exp, token, perm });

            next();
        }
        catch(err){
            //User unauthorized
            return next(new errors.UnauthorizedError(err));
        }
    });

    //Check if email exists
    server.post("/check", async (req, res, next) => {
        const { email } = req.body.newEmail;
        try{
            const user = await User.findOne({email : req.body.newEmail});
            if(user){
                res.send(false).status(200);
            }else{
                res.send(true).status(204);
            }
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(`There is no email with the email of ${req.body.email}`));
        }
    });
}