'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
   
    userid :{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    theaterid : {type:mongoose.Schema.Types.ObjectId, ref:"theatreModel"},
    movieid :{type:mongoose.Schema.Types.ObjectId, ref:"movieModel"},
     showtime:{
        type:String,
        required:'Show time is mandatory.'
    },
    seatdetails:{
        type:String,
        required:'Number of seats are mandatory'
    },
    totalamount:{
        type: Number,
        required:'kindly enter total amount.'
    },
    creationtime: {type: Date, default: Date.now()},   
});
// exports model
module.exports = mongoose.model('Orders', OrderSchema);
