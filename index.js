const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');
const cors = require('cors');

const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());


server.use(cors());

//Protect Routes
//server.use(rjwt({ secret : config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true});
});

/*
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Credentials', true)
	next();
});
*/

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/fields')(server);
    require('./routes/users')(server);
    require('./routes/typology')(server);
    require('./routes/sensorType')(server);
    require('./routes/polygonType')(server);
    require('./routes/sensor')(server);
    require('./routes/polygon')(server);
    require('./routes/measurementSet')(server);
    require('./routes/notification')(server);
    require('./routes/measurement')(server);
    console.log(`Server started on port ${config.PORT}`);
});
