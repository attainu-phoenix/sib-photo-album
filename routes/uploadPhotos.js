'use strict'
var multer = require('multer');
const crypto = require('crypto')


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/uploads')
    },
    filename: (req, file, cb) => {
        // randomBytes function will generate a random name
        let customFileName = crypto.randomBytes(18).toString('hex')
        // get file extension from original file name
        let fileExtension = file.originalname.split('.')[1]
        cb(null, customFileName + '.' + fileExtension)
    }
});

var upload = multer({ storage: storage }).array('photos', 3);

/**
 * 
 * @param {request} request 
 * @param {response} response 
 */
var uploadPhotos = function (request, response) {
    console.log("/uploadPhotos route executed ...")

    upload(request, response, function (error) {

        if (error instanceof multer.MulterError) {

            response.json({ message: "Error" });
            return;
        } else if (error) {

            response.json({ message: 'Error' });
            return;
        }
        var uploadedPhotosPath = []
        for (var i = 0; i < request.files.length; i++) {
            uploadedPhotosPath.push(request.files[i].path)
        }
        var data = {
            message: "Success",
            uploadedPhotosPath: uploadedPhotosPath
        }
        console.log(data);
        response.json(data);
    });
}



exports.uploadPhotos = uploadPhotos;