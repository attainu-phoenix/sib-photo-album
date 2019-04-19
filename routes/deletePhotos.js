'use strict'

var deletePhotos = function(request,response){
    console.log("/deletePhotos route executed ...")
    if (!request.body) return res.json("400");
    var path = request.body.path;
    console.log(path);
    response.json("Response from server .");
    
}

exports.deletePhotos = deletePhotos;