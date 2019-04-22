'use strict'
var mongodb = require('mongodb');
var shuffle = require('shuffle-array');
var DB;
var homePage = function(request,response){

	if(!request.session.user){
		response.redirect("/");
		return;
	}
	DB = request.app.locals.DB;
	var pass = {
		sharedPublicly : true
	};
	var select = {
		images:1,
		_id:0
	};

  DB.collection("albums").find(pass,select).toArray(function(error,result){
        if(error){
            console.log("Error  :"+error);
            return;
        }

        var data = {};
        var photolist =[];

        for(var i=0;i<result.length;i++){ //0(album) -> images (3)
        	// console.log(result[i].images[i].path);
        	 for(var j=0;j<result[i].images.length;j++){ //0. 3
        	 	//console.log(result[i].images[i].path);

        	 	photolist.push({path:result[i].images[j].path}); //0 3  0 5
        	 }
        }
        shuffle(photolist);
        data.photolist = photolist;
        data.user = request.session.user;
        //console.log(photolist);
        //console.log(photolist);
        //console.log(data);
        //console.log(result.length);
        
        response.render("homepage.hbs",data);
    })


 
}

exports.homePage = homePage;