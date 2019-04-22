'use strict';
var mongodb = require('mongodb');


var DB;
var albumPhots = function (request, response) {
   

   if(!request.session.user){
        response.redirect("/");
        return;
    }
  
    var albumId ;
    if(request.query.id != null){
        albumId = request.query.id;
    }
  
    DB = request.app.locals.DB;
   
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
        response.redirect("/");
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
            console.log("error occured while inserting data into the collection");
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
        response.redirect("/");
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

var deleteAlbum = function(request, response){
    //var confirmation = ("Are you sure to delete this Album?");
     DB = request.app.locals.DB;
     var mongoId = request.params.mongoId; 
            
     DB.collection("albums").findOne({_id: mongodb.ObjectID(mongoId) }, function(error, result){

        if(error){
            console.log("error");

        } else {
            response.send("data received")
        }
     });
        
    }


exports.deleteAlbum = deleteAlbum;
exports.getAlbums = getAlbums;
exports.albumPhots = albumPhots;
exports.createAlbum = createAlbum;