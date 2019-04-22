'use strict'

var homePage = function(request,response){

	if(!request.session.user){
		response.redirect("/");
		return;
	}
	var data = {
		user:request.session.user
	};
    response.render("homepage.hbs",data)
}

exports.homePage = homePage;