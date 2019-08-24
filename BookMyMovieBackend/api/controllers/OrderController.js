'use strict';
//import order service.
const orderService = require('../services/orderServices');
const emailService = require('../services/emailServices');
var mongoose = require('mongoose');
let Order = mongoose.model('Orders');

exports.user_orders = function (request, response) {
    Order.aggregate([
        { $match: { userid: mongoose.Types.ObjectId(request.params.userId) } },
        { '$lookup': { from: 'users', localField: 'userid', foreignField: '_id', as: 'userRef' } },
        { '$unwind': '$userRef' },
        { '$lookup': { from: 'theatres', localField: 'theaterid', foreignField: '_id', as: 'theaterRef' } },
        { '$unwind': '$theaterRef' },
        { '$lookup': { from: 'movies', localField: 'movieid', foreignField: '_id', as: 'movieRef' } },
        { '$unwind': '$movieRef' }

    ]).exec(function (err, docs) {
        response.json(docs);
    });
}

//code for post method
exports.create_order = function (req, res) {
    console.log("order");
    const newOrder = Object.assign({}, req.body);
    console.log(newOrder);
    const resolve = (order) => {
        res.status(200);
        res.json(order);
    };
    orderService.save(newOrder)
        .then(resolve)
        .then(emailService.email(newOrder))
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

/**
* Returns a list of orders in JSON
*
* @param {request} {HTTP request object}
* @param {response} {HTTP response object}
*/
exports.list_all_orders = function (request, response) {
    const resolve = (orders) => {
        response.status(200);
        response.json(orders);
    };
    orderService.orderList({})
        .then(resolve)
        .catch(renderErrorResponse(response));
};

/**
 * Returns a contact object in JSON.
 *
 * @param {request} {HTTP request object}
 * @param {response} {HTTP response object}
 */

exports.get_orderfor_bookedseats = function (req, response) {
    //get order for booked seats
    const resolve = (u_orders) => {
        response.status(200);
        console.log(u_orders);
        response.json(u_orders);
    };
    orderService.get_orderfor_bookedseats(req.params.theaterId, req.params.movieId, req.params.showTime, req.params.date)
        .then(resolve)
        .catch(renderErrorResponse(response));

}




// exports.user_orders = function (request, response) {
//     Order.aggregate([
//         { $match: {}}

//     ]

//     )
//     const resolve = (u_orders) => {
//         response.status(200);
//         response.json(u_orders);
//     };
//     orderService.user_orders(request.params.userId)
//         .then(resolve)
//         .catch(renderErrorResponse(response));
// };


