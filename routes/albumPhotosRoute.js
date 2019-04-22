'use strict';
var mongodb = require('mongodb');
var fs = require('fs')


var DB;
var albumPhots = function (request, response) {


    if (!request.session.user) {
        response.redirect("/");
        return;
    }

    var albumId;
    if (request.query.id != null) {
        albumId = request.query.id;
    }

    DB = request.app.locals.DB;

    DB.collection("albums").find({ _id: mongodb.ObjectID(albumId) }).toArray(function (error, result) {
        if (error) {
            console.log("Error  :" + error);
            return;
        }
        var data = {
            id: albumId,
            photosList: result[0].images,
            initialName: giveInitial(request.session.user.fullName)
        }

        response.render("albumphotopage.hbs", data);
    })

}

var createAlbum = function (request, response) {


    if (!request.session.user) {
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

    var emailAddress = request.session.user.emailAddress;
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

    if (!request.session.user) {
        response.redirect("/");
    }
    DB = request.app.locals.DB;
    var albums = {};
    if (request.query.success) {
        albums.albumAdded = true;

    }
    var details = {
        emailAddress: request.session.user.emailAddress
    };
    DB.collection("albums").find(details).toArray(function (error, result) {
        if (error) {
            console.log(error);
            // response.send("error");
            albums.albumAdded = false;
        } else {
            albums.listOfAlbums = result
            albums.initialName = giveInitial(request.session.user.fullName)

        }

        // console.log(albums);
        response.render("create_album.hbs", albums);
    })
}

var deleteAlbum = function (request, response) {

    DB = request.app.locals.DB;
    var mongoId = request.query.id;
    console.log(mongoId);

    DB.collection("albums").deleteOne({ _id: mongodb.ObjectID(mongoId) }, function (error, result) {

        if (error) {
            console.log("error");

        } else {
            response.redirect("/getAlbum")
        }
    });

}

var giveInitial = function (str) {
    var firstLetter = str.charAt(0);
    var indexOfSpace = str.indexOf(' ');
    var secondLetter = str.charAt(indexOfSpace + 1);
    return (firstLetter + secondLetter).toUpperCase()
}


exports.deleteAlbum = deleteAlbum;
exports.getAlbums = getAlbums;
exports.albumPhots = albumPhots;
exports.createAlbum = createAlbum;