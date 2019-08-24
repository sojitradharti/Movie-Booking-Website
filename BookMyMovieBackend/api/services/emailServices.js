
'use strict';
var nodemailer = require('nodemailer');


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookmymovie13@gmail.com',
    pass: 'ijklmn786@'
  }
});

var mailOptions = {
  from: 'bookmymovie13@gmail.com',
  to: 'deeptinigamadmit@gmail.com',
  subject: 'Order Successful',
  text: 'Congratulation on your order booking'
};

var fpMailOptions = {
  from: 'bookmymovie13@gmail.com',
  to: 'deeptinigamadmit@gmail.com',
  subject: 'Reset password',
  text: 'Congratulation on your order booking'
};

// Sent order success mail to user 
exports.email = function (newOrder) {
  mailOptions.text = 'Your order details ' + "Show Time: " 
  + newOrder.showtime + " Total Seats: " + newOrder.seatdetails + 
 " Total Amount: " + newOrder.totalamount + " Booking Time: " +
 newOrder.creationtime;
  mailOptions.to = newOrder.email;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
// Sent password reset mail to user
exports.forgotPasswordEmail = function (email, link) {
  console.log(link);
  console.log(email);
  fpMailOptions.text = 'We are here to help. \n Please click on the link below to reset your password \n' + link;
  fpMailOptions.to = email;
  transporter.sendMail(fpMailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};







