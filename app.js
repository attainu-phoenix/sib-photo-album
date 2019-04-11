var express = require('express')
var bodyParser = require('body-parser')
var mongoDb = require('mongodb')

var indexPage = require("./routes/index.js")
var signup = require("./routes/signup.js")
var createalbumpage = require("./routes/createalbumpage.js")
var explorePage = require("./routes/explorepage.js")
var shareAlbum = require("./routes/sharealbumroute")

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine","hbs");
app.use(express.static('public'));



app.get("/",indexPage.indexPage);

app.post("/signup",signup.signup);

app.get("/createAlbum",createalbumpage.createAlbum);

app.get("/explore",explorePage.explore);

app.get("/shareAlbum",shareAlbum.shareAlbum);

app.listen(3000);