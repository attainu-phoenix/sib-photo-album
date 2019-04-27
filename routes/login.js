'use strict'
var mongodb = require('mongodb');
var md5 = require('md5');
var DB;


var login = function(request, response) {

    DB = request.app.locals.DB;
    var userDetails = {
        emailAddress: request.body.email,
        password: md5(request.body.password)
    };
    DB.collection("users").findOne(userDetails,function(error,user){
            var data = {};                                                            
    	if(error){
    		message ="Error Occured While Signup";
    	}
        else if(!user){
                    response.redirect("/login?isLogin=false");
                  }
    	else{
    		//request.flash('signupMessage', "Sucess");
    		request.session.user = user;
            response.redirect("/home");
    	}
    });

    

  
}

var onLoginSuccess = function(request,response){
        console.log("on login success execu");
    var data = {};
    if(!request.query.isLogin){
        data.isLogin = false;
        
    }
    else{
        data.isLogin = true;
    }
    response.render("index.hbs",data);
}


exports.login = login;
exports.onLoginSuccess = onLoginSuccess;