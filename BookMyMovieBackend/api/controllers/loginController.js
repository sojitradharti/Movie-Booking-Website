'use strict';
//import user service.
const loginService = require('../services/loginServices');
const jwt = require("jsonwebtoken");
let config = require('../../config');

/**
 * Returns access token and user details
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.login = function (request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    console.log(request.body);
    if (!request.body.username || !request.body.password) {
        response.json({
            status: 400,
            message: 'Authentication failed! Please check the request'
        });
        return;
    }
    const token = jwt.sign({
        username: request.body.username
    }, Buffer.from(config.secret).toString('base64'), { expiresIn: "24 hours" });
    const resolve = (res) => {
        if (res !== null) {
            response.status(200);
            response.json({
                status: 200,
                access_token: token,
                user: res,
                message: "User authenticated successfully"

            });
        } else {
            response.json({
                status: 403,
                message: "Incorrect username or password"

            });
        }

    };
    loginService.login(request)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

// error function
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};

