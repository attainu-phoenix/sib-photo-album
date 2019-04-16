'use strict'
var createAlbum = function(request,response){
    console.log("/album route executed ...")
    response.render("create_album.hbs")
}

exports.createAlbum = createAlbum;