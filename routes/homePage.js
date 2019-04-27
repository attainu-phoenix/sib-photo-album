'use strict'
var mongodb = require('mongodb');
var shuffle = require('shuffle-array');
var DB;



var giveInitial = function (str) {
    var firstLetter = str.charAt(0);
    var indexOfSpace = str.indexOf(' ');
    var secondLetter = str.charAt(indexOfSpace + 1);
    return (firstLetter + secondLetter).toUpperCase()
}

var homePage = function (request, response) {

    if (!request.session.user) {
        response.redirect("/");
        return;
    }
    DB = request.app.locals.DB;
    var pass = {
        sharedPublicly: true
    };
    var select = {
        images: 1,
        _id: 0
    };

    DB.collection("albums").find(pass, select).toArray(function (error, result) {
        if (error) {
            console.log("Error  :" + error);
            return;
        }

        var data = {};
        var photolist = [];

        for (var i = 0; i < result.length; i++) { //0(album) -> images (3)
            // console.log(result[i].images[i].path);
            for (var j = 0; j < result[i].images.length; j++) { //0. 3
                //console.log(result[i].images[i].path);

                photolist.push({ path: result[i].images[j].path }); //0 3  0 5
            }
        }
        shuffle(photolist);
        data.photolist = photolist;
        data.user = request.session.user;
        data.initialName = giveInitial(data.user.fullName);

        response.render("homepage.hbs", data);
    })



}


exports.homePage = homePage;