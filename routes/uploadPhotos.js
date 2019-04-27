'use strict'

var multer = require('multer');
var mongodb = require('mongodb');
const crypto = require('crypto');
var path = require('path');
var DB;
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');



var storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'folder-name',
    allowedFormats: ['jpg', 'png'],
    filename: (req, file, cb) => {
        // randomBytes function will generate a random name
        let customFileName = crypto.randomBytes(18).toString('hex')
        // get file extension from original file name
        let fileExtension = file.originalname.split('.')[1]
        cb(null, customFileName + '.' + fileExtension)
    }
});


var uploadPhotos = function (request, response) {

    if (!request.session.user) {
        response.redirect("/");
        return;
    }

    var upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                response.json({ message: "Error" });
                return;
            }
            callback(null, true)
        }

    }).array('photos', 5);
    // console.log("/uploadPhotos route executed ...")
    upload(request, response, function (error) {
        var albumId = request.body.albumId;

        DB = request.app.locals.DB;

        if (error instanceof multer.MulterError) {
            console.log(error)
            response.json({ message: "Error" });
            return;
        }
        console.log("No of files :"+request.files.length);
        var uploadedPhotosPath = []
        for (var i = 0; i < request.files.length; i++) {

            uploadedPhotosPath.push(request.files[i].secure_url)
        }

        var oldPhotoUploadedPath = []
        DB.collection("albums").find({ _id: mongodb.ObjectID(albumId) }).toArray(function (error, result) {

            // Getting Old images array from database

            for (var i = 0; i < result[0].images.length; i++) {
                oldPhotoUploadedPath.push({ path: result[0].images[i].path });
            }

            //Adding new images path  in old images path array form database
    
            for (var i = 0; i < uploadedPhotosPath.length; i++) {
                oldPhotoUploadedPath.push({ path: uploadedPhotosPath[i] });
            }
            DB.collection("albums").updateOne({ _id: mongodb.ObjectID(albumId) }, { $set: { images: oldPhotoUploadedPath } },
                function (error, result) {
                    if (error) {
                        console.log(error)
                        return;
                    }
                    console.log("Photos Uploded Successfully Into Album.");
                })
            var data = {
                message: "Success",
                uploadedPhotosPath: oldPhotoUploadedPath
            }
            console.log(data)
            return response.json(data);
        });


    });
}



exports.uploadPhotos = uploadPhotos;