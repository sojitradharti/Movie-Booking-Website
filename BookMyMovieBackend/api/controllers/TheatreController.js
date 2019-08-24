'use strict';
//import Theatre service.
const theatreService = require('../services/theatreServices');

//code for post method
exports.create_theatre = function(req, res) {  
    const newtheatre = Object.assign({}, req.body);
    console.log(req.body);  
    const resolve = (theatre) => {   
        
        res.status(200);
        res.json(theatre);
    };
    theatreService.save(newtheatre)
        .then(resolve)
        .catch(renderErrorResponse(res));
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
/* Returns a list of orders in JSON
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.list_all_theaters = function (request, response) {
    response.header('Access-Control-Allow-Origin' , '*' );
    const resolve = (theatres) => {
        response.status(200);
        response.json(theatres);
    };
    theatreService.theaterList({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};
/**
 * Returns a thater object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */
exports.theater_detail = function (request, response) {
    const resolve = (theater) => {
        response.status(200);
        response.json(theater);
    };
    theatreService.get(request.params.theaterId)
        .then(resolve)
        .catch(renderErrorResponse(response));
};
