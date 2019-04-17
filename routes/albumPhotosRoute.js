'use strict';
var mongodb = require('mongodb');


var DB;
var albumPhots = function (request, response) {
   

   if(!request.session.user){
        response.send("UNAUTHORIZED");
    }
  
    var albumId ;
    if(request.query.id != null){
        albumId = request.query.id;
    }
  
    DB = request.app.locals.DB;
    console.log(albumId);
    DB.collection("albums").find({ _id: mongodb.ObjectID(albumId) }).toArray(function(error,result){
        if(error){
            console.log("Error  :"+error);
            return;
        }
        var data={
            id:albumId,
            photosList:result[0].images
        }
        
        response.render("albumphotopage.hbs",data);
    })
    
}

var createAlbum = function (request, response) {

  
   if(!request.session.user){
        response.send("UNAUTHORIZED");
    }
    console.log("/createAlbum route executed..")

    DB = request.app.locals.DB;
    var albumName = request.body.albumName;
    var isShared = request.body.exampleRadios;
    var unixtime = 1301090400;
    var newDate = new Date();
    newDate.setTime(unixtime * 1000);
    var dateString = newDate.toUTCString();
    var sharedPublicly;
    if (isShared == "isPrivate") {
        sharedPublicly = false;
    } else {
        sharedPublicly = true;
    }
    console.log(albumName + " " + sharedPublicly + " " + dateString);

    var emailAddress = "surinder12@gmail.com";
    var albumLink = "www.google.com";
    var album = {
        emailAddress: emailAddress,
        albumName: albumName,
        dateCreated: dateString,
        sharedPublicly: sharedPublicly,
        albumLink: albumLink,
        images: []
    };

    DB.collection("albums").insertOne(album, function (error, result) {
        var albums = {};

        if (error) {
            console.log("error occured while inserting data into the instructors collection");
            albums.albumAdded = false;
            response.render("create_album.hbs", albums);
        } else {
            response.redirect("/getAlbum?success=true");
        }

    });

}

var getAlbums = function (request, response) {
    // console.log("i am getting albums to show on card");
    
   if(!request.session.user){
        response.send("UNAUTHORIZED");
    }
    DB = request.app.locals.DB;
    var albums = {};
    if (request.query.success) {
        albums.albumAdded = true;
    }
    DB.collection("albums").find({}).toArray(function (error, result) {
        if (error) {
            console.log(error);
            // response.send("error");
            albums.albumAdded = false;
        } else {
            albums.listOfAlbums = result

        }

        // console.log(albums);
        response.render("create_album.hbs", albums);
    })
}
exports.getAlbums = getAlbums;
exports.albumPhots = albumPhots;
exports.createAlbum = createAlbum;