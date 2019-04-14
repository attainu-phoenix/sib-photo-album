var express = require('express')
var bodyParser = require('body-parser')
var mongoDb = require('mongodb');
var multer = require('multer');
var indexPage = require("./routes/index.js")
var signup = require("./routes/signup.js")
var createalbumpage = require("./routes/createalbumpage.js")
var homePage = require("./routes/homePage")
var shareAlbum = require("./routes/sharealbumroute")
var albumPhotos = require("./routes/albumPhotosRoute")
var uploadPhotos = require("./routes/uploadPhotos.js");
const assert = require("assert");
// Initializing express app 
var app = express();
//Using body parser
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
//Setting templating engine
app.set("view engine","hbs");
//Using public folder as static folder
app.use(express.static('public'));

var upload = multer({ dest: 'uploads/' })
//Connecting to DB
var DB;
var mongoClient = new mongoDb.MongoClient("mongodb://localhost:27017/sib",{useNewUrlParser:true})
mongoClient.connect(function(error){
    assert.equal(null,error)
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

app.get("/albums",createalbumpage.createAlbum);

app.get("/home",homePage.homePage);

app.get("/shareAlbum",shareAlbum.shareAlbum);

app.get("/albumPhotos",albumPhotos.albumPhots);

app.post("/uploadPhotos",uploadPhotos.uploadPhotos);

app.listen(3000);