// ==============================================================================
// DEPENDENCIES
// Series of npm packages used to give our server useful functionality
// ==============================================================================

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require("express-handlebars");

var app = express();

// Use the express.static middleware to serve static content for the app from the public directory
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");


app.use(bodyParser.json());

var routes = require("./controllers/burgers_controller.js");

app.use('/', routes);

// process.env.PORT lets the port of our app be set by Heroku
var PORT = process.env.PORT || 3000;


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});
