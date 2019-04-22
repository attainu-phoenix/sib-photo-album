'use strict'
var mongodb = require('mongodb');


var DB;
var viewprofile = function(request,response){

	if(!request.session.user){
		response.send("UNAUTHORIZED");
		return;
	}
	var data = {
		user : request.session.user
	};
	
	response.render("profile.hbs",data);
}


var changePassword = function(request,response){
	DB = request.app.locals.DB;
	var oldPassword = request.body.old_pass;
	var password = request.body.password;

	if(oldPassword == request.session.user.password){
		DB.collection("users").updateOne({"emailAddress" : request.session.user.emailAddress},
			{$set : {"password" : password} },function(error,user){
				request.session.user = user;
		        response.redirect("/changePassword?Success=true");
		        console.log(request.session.user.fullName);
			});
		
	}
	else{
		response.redirect("/changePassword?Success=false");
	}
}
var onPasswordChangeSuccess = function(request,response){
        //console.log("on login success execu");
    var data = {};
    if(request.query.Success == "true"){
        data.isUpdatePass = true ;
        
    }
    else{
        data.isUpdatePass = false;
    }
    response.render("profile.hbs",data);
}
exports.changePassword = changePassword;
exports.viewprofile = viewprofile;
exports.onPasswordChangeSuccess = onPasswordChangeSuccess;