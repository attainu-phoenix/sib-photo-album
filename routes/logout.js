'use strict'

var logout = function(request,response){
	request.session.user = null;
	response.redirect("/");
}

exports.logout = logout;