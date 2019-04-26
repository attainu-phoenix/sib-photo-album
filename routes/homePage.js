'use strict'

var homePage = function(request,response){

	if(!request.session.user){
		response.send("UNAUTHORIZED");
	}
	var data = {
		user:request.session.user
	};
    response.render("homepage.hbs",data)
}

exports.homePage = homePage;