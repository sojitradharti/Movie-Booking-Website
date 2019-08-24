'use strict';
let mongoose = require('mongoose');
require('../models/UserModel');
let User = mongoose.model('User');
/**
 * Get user details with user id
 *
 * @param {User} user {User object}
 */
exports.forgotPassword = function (email) {
    const promise = User.findOne({email: email});
    return promise;
};

/**
 * Update random token and returns new user details
 *
 * @param {User} user {User object}
 */
exports.updateRandomToken = function(user, token){
    const promise = User.findOneAndUpdate({_id: user._id}, { $set: {reset_password_token: token, reset_password_expires: Date.now() + 86400000} }, {new: true}).exec();
    return promise;
};

/**
 *Reset password using user id
 *
 * @param {User} user {User object}
 */
exports.resetPassword = function(id, password){
    const promise = User.findOneAndUpdate({_id: id}, { $set: {password: password,reset_password_token: "", reset_password_expires: ""} }, {new: true}).exec();
    return promise;
};

/**
 *Find user by token
 *
 * @param {User} user {User object}
 */
exports.findUserByToken = function(token){
    const promise = User.findOne({reset_password_token: token});
    return promise;
};
