'use strict';
//initiate mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TheatreSchema = new Schema({   
  
    theatreName :{
        type:String,
        required:'kindly enter your theatreName.'
    }
});

var theatreModel = mongoose.model("Theatre", TheatreSchema);
module.exports = theatreModel;
module.exports = TheatreSchema;