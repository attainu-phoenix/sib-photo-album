'use strict'
var shareAlbum = function(request,response){
	 if(!request.session.user){
		response.redirect("/");
		return;
	}
    response.send("generate share album view");
}

exports.shareAlbum = shareAlbum;