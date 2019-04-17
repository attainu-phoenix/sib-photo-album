'use strict'
var shareAlbum = function(request,response){
	 if(!request.session.user){
        response.send("UNAUTHORIZED");
    }
    response.send("generate share album view");
}

exports.shareAlbum = shareAlbum;