'use strict'
var mongodb = require('mongodb');
var DB;
var message;

var login = function(request, response) {

    DB = request.app.locals.DB;
    var userDetails = {
        email: request.body.email,
        password: request.body.password
    };
    DB.collection("users").findOne(userDetails,function(error,user){
    	if(error){
    		message ="Error Occured While Signup";
    	}
        else if(!user){
                    response.send("Invalid Username or Password")
                  }
    	else{
    		//request.flash('signupMessage', "Sucess");
    		request.session.user = user;
            response.redirect("/home");
    	}
    });

    

  
}

exports.login = login;