var express = require('express')
var bodyParser = require('body-parser')
var mongoDb = require('mongodb');
var indexPage = require("./routes/index.js")
var signup = require("./routes/signup.js")
var login = require("./routes/login.js")
var logout = require("./routes/logout.js")
var createalbumpage = require("./routes/createalbumpage.js")
var homePage = require("./routes/homePage")
var shareAlbum = require("./routes/sharealbumroute")
var albumPhotos = require("./routes/albumPhotosRoute")
var uploadPhotos = require("./routes/uploadPhotos.js");
var profile = require("./routes/profile.js");
var deleteAlbumPhotos = require("./routes/deleteAlbumPhotos");
var session = require("express-session");

// Initializing express app 
var app = express();
//Using body parser
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

//USING SESSION
app.use(session({secret: "catkey"}));
//Setting templating engine
app.set("view engine","hbs");
//Using public folder as static folder
app.use(express.static('public'));



//Connecting to DB
var DB;
var DB_URL = process.env.DB_URL || "mongodb://localhost:27017/sib";
console.log(DB_URL)
var mongoClient = new mongoDb.MongoClient(DB_URL,{useNewUrlParser:true})
mongoClient.connect(function(error){
    
    if(error){
        console.log("Error Connecting To The DB");
        return;
    }else{
        console.log("Database Connected")
    }
    //This "DB" variable will be available throughout the application 
    //use this variable for database operation.
    DB = mongoClient.db("sib");
    app.locals.DB = DB;
});

app.get("/",indexPage.indexPage);

app.post("/signup",signup.signup);

app.get("/signup",signup.onSignUpSuccess);

app.post("/login",login.login);

app.get("/login",login.onLoginSuccess);

app.get("/profile",profile.viewprofile);

app.post("/changePassword",profile.changePassword);

app.get("/changePassword",profile.onPasswordChangeSuccess);

app.get("/logout",logout.logout);

app.get("/albums",createalbumpage.createAlbum);

app.get("/home",homePage.homePage);

app.get("/shareAlbum",shareAlbum.shareAlbum);

app.get("/albumPhotos",albumPhotos.albumPhots);

app.get("/getAlbum",albumPhotos.getAlbums);

app.post("/uploadPhotos",uploadPhotos.uploadPhotos);

app.post("/createAlbum",albumPhotos.createAlbum);

app.delete("/deleteAlbumsPhotos",deleteAlbumPhotos.deletePhotos);

app.get("/deleteAlbum",albumPhotos.deleteAlbum);

app.listen(process.env.PORT || 3000); 