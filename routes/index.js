'use strict'

var indexPage = function(request,response){

    console.log("/ route executed...")
    
    response.render("index.hbs")
}


var signup = function(request,response){
    
    response.render("index.hbs")
}

exports.indexPage = indexPage;
exports.indexPage = signup;