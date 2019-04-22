'use strict'
var mongodb = require('mongodb');
var fs = require('fs');

var DB;

var deletePhotos = function (request, response) {
    if (!request.session.user) {
        response.redirect("/");
        return;
    }
    console.log("/deletePhotos route executed ...")
    if (!request.body) return res.json("400");
    var photosToBeDeleted = request.body.photosToBeDeleted;
    var albumId = request.body.albumId;

    var photosTemp = [];

    for (var i = 0; i < photosToBeDeleted.length; i++) {
        // data.path = photosToBeDeleted[i];
        photosTemp.push(photosToBeDeleted[i]);
    }
    // console.log(photosTemp)
    DB = request.app.locals.DB;
    var data = {}
    photosTemp.forEach(function (file) {
        // console.log(file);
        fs.unlink("./public" + file, function (error) {
            if (error) {
                data.isDeleted = false;
                data.error = error;
            } else {
                data.isDeleted = true;
            }

        })
    })
    DB.collection("albums").updateOne(
        { '_id': mongodb.ObjectId(albumId) },
        { $pull: { "images": { "path": { $in: photosTemp } } } }, function (error) {
            if (error) {
                // console.log(error);
                return;
            }

            response.json(data);
        });

}

exports.deletePhotos = deletePhotos;