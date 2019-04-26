'use strict'
var createAlbum = function(request,response){
    console.log("/album route executed ...")
     if(!request.session.user){
        response.send("UNAUTHORIZED");
    }
    response.render("create_album.hbs")
}

exports.createAlbum = createAlbum;