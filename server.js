var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


mongoose.Promise = Promise;


var app = express();
var PORT = process.env.PORT || 8080;


app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');


app.use(express.static("public"));


mongoose.connect("mongodb://localhost/");
var db = mongoose.connection;


db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});


db.once("open", function () {
    console.log("Mongoose connection successful.");
});


require("./controllers/articlesController.js")(app);


app.listen(PORT, function () {
    console.log("App running on port 8080");
});