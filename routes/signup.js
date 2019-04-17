'use strict'
var mongodb = require('mongodb');
var DB;
var signup = function(request,response){
   var userDetails = {
   	name: request.body.name,
   	email: request.body.email,
   	password: request.body.password
   };

   console.log(userDetails);
   response.render("index.hbs");

}

exports.signup = signup;