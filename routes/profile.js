'use strict'

var viewprofile = function(request,response){

	if(!request.session.user){
		response.send("UNAUTHORIZED");
	}
	var data = {
		user : request.session.user
	};
	
	response.render("profile.hbs",data);
}


var changePassword = function(request,response){
	console.log("Executed CH PASS");
}

exports.changePassword = changePassword;
exports.viewprofile = viewprofile;