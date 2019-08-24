'use strict';
//import user service.
const signUpService = require('../services/signupService');
const loginService = require('../services/loginServices');
const jwt = require("jsonwebtoken");
let config = require('../../config');

/**
 * Returns access_token and user details
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.signUp = function (request, response) {
    response.header('Access-Control-Allow-Origin' , '*' );
    console.log('Username' + request.body.username);
    if (!request.body.username || !request.body.password || !request.body.email || !request.body.phoneNo){
        response.json({
            status: 400,
            message: 'Error in request, Please check the request'
        });
        return;
    }
    const token = jwt.sign({
        username: request.body.username
    }, Buffer.from(config.secret).toString('base64'), {expiresIn: "24 hours"});
    const resolve = (res) => {
        if(res !== null){
            response.json({
                status: 409,
                message: "User already exists"
            });
        }else{
            console.log('Request' + request.body.username);
            signUpService.signUp(request.body)
                .then(resolveSignUp)
                .catch(renderErrorResponse(response));
        }
    };
    const resolveSignUp = (signUpResponse) => {
        if(signUpResponse != null){
            response.json({
                status: 200,
                token: token,
                user: signUpResponse,
                message: "User created successfully"
            });
        } else{
            response.json({
                status: 400,
                message: "Error in creating user account"
            });
        }
    }
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

