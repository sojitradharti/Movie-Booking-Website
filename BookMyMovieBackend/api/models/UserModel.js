'use strict';
//initiate mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    firstname :{
        type:String,
        required:'Please enter your first name.'
    },
    lastname :{
        type:String,
        required:'Please enter your last name.'
    },
    username :{
        type:String,
        required:'Please enter your username.',
        unique:true
    },
    email:{
        type:String,
        required:'Please enter your email.',
        unique:true
    },    
    password:{
        type:String,
        required:'Please enter your password.'
    },
    phoneNo:{
        type:String,
        required:'Please enter your phone number.'
    },
    address: {
        type: String
    },
    profilePicUrl: {
        type: String
    },
    reset_password_token:{
        type: String
    },
    reset_password_expires: {
        type: String
    },
    access_token: {
        type: String
    }

});
// // exports model
// module.exports = mongoose.model('User', User);


// exports model
var userModel = mongoose.model('User', User);

module.exports = userModel;
module.exports = User

