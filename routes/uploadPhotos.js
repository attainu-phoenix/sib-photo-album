var multer = require('multer');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
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
        response.json(data);
    });
}



exports.uploadPhotos = uploadPhotos;