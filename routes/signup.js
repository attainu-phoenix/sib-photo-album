'use strict'
var mongodb = require('mongodb');
var md5 = require('md5');
var DB;


var signup = function(request, response) {

    DB = request.app.locals.DB;
    var userDetails = {
        fullName: request.body.name,
        emailAddress: request.body.email,
        password: md5(request.body.password)
    };

    DB.collection("users").insertOne(userDetails,function(error){
    	if(error){
    		    response.redirect("/signup?sucess=false");
    	}
    	else{
    		//request.flash('signupMessage', "Sucess");
    		//response.send("SUCCESS SIGNUP");
    		    response.redirect("/signup?sucess=true");
    		

    	}
    	
    });

    

  
}

var onSignUpSuccess = function(request,response){
	console.log("on success execu");
	var data = {};
	if(request.query.sucess == "true"){
		console.log("In If cond on onSignUpSuccess");
		data.message = true;

		
	}
	else{
			console.log("In Else cond on onSignUpSuccess");
		data.messageFailed = true;
	}

	console.log(request.query.sucess);
	response.render("index.hbs",data);

}

exports.signup = signup;
exports.onSignUpSuccess = onSignUpSuccess;