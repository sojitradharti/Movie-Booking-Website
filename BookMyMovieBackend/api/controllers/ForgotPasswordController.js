'use strict';
//import user service.
const forgotPasswordService = require('../services/forgotPasswordService');
const emailService = require('../services/emailServices')
const jwt = require("jsonwebtoken");
let config = require('../../config');
const crypto = require('crypto');

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

/**
 * Sends link in email to reset password
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.sendForgotPasswordEmail = function (request, response) {
    const resolve = (res) => {
        if(res !== null){
            console.log('calling save token and send email');
           // saveTokenAndSendEmail(res);
            const sendEmail = (res) => {
                if(res !== null){
                    console.log('random token updatiom');
                    emailService.forgotPasswordEmail(res.email, 'http://localhost:4300/resetpassword/'+res.reset_password_token);
                    response.json({
                        status: 200,
                        message: "User details fetched successfully",
                        user: res
                    });
                }else{
                    console.log('token update failed');
                }
            };
            crypto.randomBytes(10, function(err, buffer) {
                let token = buffer.toString('hex');
                console.log("token: ", token)
                forgotPasswordService.updateRandomToken(res, token)
                    .then(sendEmail)
            });

        }else{
            console.log('user null');
            response.json({
                status: 401,
                message: 'User id needed'
            });
        }
    };
    console.log(request.body.email);
    forgotPasswordService.forgotPassword(request.body.email)
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Resets password using reset password token
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.reset_password = function (request, response){
    const resolve = (res) => {
        if(res !== null){
            response.json({
                status: 200,
                message: 'Reset successful'
            });
        }else{
            console.log('user null');
            response.json({
                status: 401,
                message: 'User id needed'
            });
        }
    };
    const resolveUser = (res) => {
        if(res !== null){
            if ( Date.now() > Number(res.reset_password_expires)){
                response.json({
                    status: 400,
                    message: 'Bad request: Token expired'
                });
            }else{
                forgotPasswordService.resetPassword(res._id, request.body.password)
                    .then(resolve)
                    .catch(renderErrorResponse(response));
            }

        }else{
            response.json({
                status: 401,
                message: 'Token invalid'
            });
        }
    }

    forgotPasswordService.findUserByToken(request.body.token)
        .then(resolveUser)
        .catch(renderErrorResponse(response));
};
