'use strict';

let mongoose = require('mongoose');
require('../models/UserModel');

let User = mongoose.model('User');
/**Login with username and password and returns username
 *
 * @param {User} user {User object}
 */
exports.login = function (user) {
    const promise = User.findOne({username: user.body.username, password: user.body.password});
    return promise;
};
