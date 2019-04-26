'use strict'
var mongodb = require('mongodb');
var DB;
var message;

var signup = function(request, response) {

    DB = request.app.locals.DB;
    var userDetails = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    };
    DB.collection("users").insertOne(userDetails,function(error){
    	if(error){
    		message ="Error Occured While Signup";
    	}
    	else{
    		//request.flash('signupMessage', "Sucess");
    		response.send("SUCCESS SIGNUP");
    	}
    });

    

  
}

exports.signup = signup;