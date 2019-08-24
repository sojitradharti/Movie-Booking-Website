'use strict';

let mongoose = require('mongoose');
require('../models/UserModel');

let User = mongoose.model('User');
/**
 * Saves and returns the new user.
 *
 * @param {User} user {User object}
 */
exports.signUp = function (user) {
    const newUser = new User(user);
    const promise = newUser.save();
    return promise;
};
