const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// User model
//const UserModel = require('../User/userModel');
const User = require('../Classes/User/user');
const SysAdmin = require('../Classes/User/sysadmin');
const Worker = require('../Classes/User/worker').Model;
const WorkerAdmin = require('../Classes/User/workerAdmin');

// Configuration file
const config   = require('../../config');

var localStrategy = new LocalStrategy(function (name, pw, cb) {
    console.log("[PASSPORT] username received : " + name );
    console.log("[PASSPORT] password received : " + pw   );
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.Model.findOne({username:name, password:pw})
        .then(user => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect username or password.'});
                //console.log("Incorrect username or password");
            }
            console.log(user);
            return cb(null, user, {message: 'Logged In Successfully'});
        })
        .catch(err => cb(err));
    }
)

// Json strategy which i still do not know if i need to use with the LocalStrategy or not
var jwtStrategyVar = new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : config.secret
    },
    function (jwtPayload, cb) {

        console.log("TESTE: " + jwtPayload.id);

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.Model.findOne({_id:jwtPayload.id})
            .then(user => {
                console.log(user);
                switch(user.userClass){
                    case 'sysadmin' : return cb(null, new SysAdmin(user));
                    case 'worker' : return cb(null, new Worker(user));
                    case 'workeradmin' : return cb(null, new WorkerAdmin(user));
                }
            })
            .catch(err => {
                return cb(err);
            });
    }
);


passport.use(localStrategy);
passport.use(jwtStrategyVar);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });


module.exports = {
    passport : passport
};