'use strict'
var mongodb = require('mongodb');


var DB;
var viewprofile = function(request,response){

	if(!request.session.user){
		response.redirect("/");
		return;
	}
	var data = {
		user : request.session.user
	};
	
	response.render("profile.hbs",data);
}


var changePassword = function(request,response){
	if(!request.session.user){
		response.redirect("/");
		return;
	}
	DB = request.app.locals.DB;
	var oldPassword = request.body.old_pass;
	var password = request.body.password;

	//var updatedUser = request.session.user;
	//updatedUser.password = password;
	//console.log(updatedUser);

	if(oldPassword == request.session.user.password){
		DB.collection("users").updateOne({"emailAddress" : request.session.user.emailAddress},
			{$set : {"password" : password} },function(error,user){

				console.log("Executed Update PAss");
				//request.session.user = user;
				//request.session.user = updatedUser;
		       response.redirect("/changePassword?Success=true");
		        console.log(request.session.user.fullName);
			});


		
	}
	else{
		console.log("Executed Update NOt RUn");
		response.redirect("/changePassword?Success=false");
	}
}
var onPasswordChangeSuccess = function(request,response){
        //console.log("on login success execu");
    var data = {};
    data.user = request.session.user;
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