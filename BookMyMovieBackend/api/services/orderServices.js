'use strict';

let mongoose = require('mongoose');
require('../models/OrderModel');

let Order = mongoose.model('Orders');
// save order method
exports.save = function (order) {
  // console.log("inside order");
    const neworder = new Order(order);
  // console.log("before order save");
    const promise = neworder.save();
 // console.log(promise);
    return promise;
};


/**
 * Returns an all orders.
 *
 */
exports.orderList = function() {
    const promise = Order.find().exec();
    return promise;
}


/**
 * Returns the order object matching the user id.
 *
 * @param {string} userId {Id of the User object which has made movie booking orders}
 */
exports.user_orders = function (userId) {
    const promise = Order.find({userid: userId}).exec();
    return promise
};


exports.get_orderfor_bookedseats =function(tId,mId,showTime,date)
{
 //   console.log(tId,mId,showTime,date); 
    const promise = Order.find({theaterid: tId,movieid: mId,showtime:showTime}).exec();    
    return promise;
}

