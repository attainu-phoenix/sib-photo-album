'use strict'

var albumPhots = function(request,response){
    response.render("albumphotopage.hbs");
}

var createAlbum = function(request,response){
    console.log("/createAlbum route executed..")
    response.render("create_album.hbs")
}

exports.albumPhots = albumPhots;
exports.createAlbum = createAlbum;