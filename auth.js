const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.authenticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            // Get user by email
            const user = await User.findOne({email});
            console.log(user);
            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    resolve(user);
                } else {
                    // Pas didn't match
                    reject('Authentication Failed');
                }
            });
        }
        catch(err){
            // Email not found
            reject('Authentication Failed');
        }
    });
}

