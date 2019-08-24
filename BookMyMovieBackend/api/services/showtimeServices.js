


'use strict';

let mongoose = require('mongoose');
require('../models/ShowTimeModel');/**
 * Returns an all showtime.
 *
 */
let ShowTime = mongoose.model('ShowTime');
exports.showtimeList = function() {
    console.log("");
    ShowTime.aggregate([  
        { '$lookup': { from: 'movies', localField: 'movieId', foreignField: '_id', as: 'movieRef'} },
        { '$unwind': '$movieRef' },
        { '$lookup': { from: 'theatres', localField: 'theatreId', foreignField: '_id', as: 'theatreRef'} },
        { '$unwind': '$theatreRef' }
    ]).exec(function (err, docs){
        console.log(docs);
    //Use docs here. It will be object so for printing results: 
    const promise =  docs;
    console.log("hii");
    return promise;
   // console.log("hii");
});   
   
}
// list by moviename
exports.list_by_movieName = function(movieName) {
    const promise = ShowTime.find({"movieId": movieName}).exec();
    console.log(promise);
    return promise;
}

exports.list = function() {
    const promise = ShowTime.find().exec();
    
    return promise;
}

//save showtime
exports.save = function (show) {
    const newshow = new ShowTime(show);
    const promise = newshow.save();
    return promise;
};

// get showtime
exports.get_show = function (showId) {
    const promise = ShowTime.findById(showId).exec();
    return promise;
};


