'use strict';


var DB;
var albumPhots = function(request,response){
    response.render("albumphotopage.hbs");
}

var createAlbum = function(request,response){


    console.log("/createAlbum route executed..")

    DB= request.app.locals.DB;
    var albumName = request.body.albumName;
    var isShared = request.body.exampleRadios;
    var unixtime = 1301090400;
    var newDate = new Date();
    newDate.setTime(unixtime*1000);
    var dateString = newDate.toUTCString();
    var sharedPublicly;
    if(isShared == "isPrivate"){
        sharedPublicly = false;
    } else {
        sharedPublicly = true;
    }
    console.log(albumName +  " " + sharedPublicly +" " +dateString);

    var emailAddress = "surinder12@gmail.com";
    var albumLink = "www.google.com";
    var album = {
        emailAddress: emailAddress,
        albumName: albumName,
        dateCreated: dateString,
        sharedPublicly: sharedPublicly,
        albumLink: albumLink,
        images:[]
    };

    DB.collection("albums").insertOne(album, function(error, result){
        var alert = {
            message: false
        }
            if(error) {
            console.log("error occured while inserting data into the instructors collection");
            response.render("create_album.hbs", alert);
        } else {
            alert.message = true;
            response.render("create_album.hbs", alert);
        }

        

    });
    
}

var getAlbums = function(request,response){
    console.log("i am getting albums to show on card");
    DB= request.app.locals.DB;
    DB.collection("albums").find({}).toArray(function(error,result){
        if(error){
            console.log(error);
            response.send("error");
            
        } else {
            var albums={
                listOfAlbums:result
            }
        }
         
        console.log(albums);
        response.render("create_album.hbs",albums);
    })
}
exports.getAlbums = getAlbums;
exports.albumPhots = albumPhots;
exports.createAlbum = createAlbum;