'use strict'
var createAlbum = function(request,response){
    console.log("/album route executed ...")
     if(!request.session.user){
        response.redirect("/");
    }
    response.render("create_album.hbs")
}

exports.createAlbum = createAlbum;