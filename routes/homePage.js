'use strict'

var homePage = function(request,response){
    response.render("homepage.hbs")
}

exports.homePage = homePage;