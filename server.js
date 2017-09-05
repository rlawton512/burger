var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// var path = require("path");

var port = process.env.PORT || 3080;

var app = express();

app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// app.use(express.static(path.join(__dirname + "/public/assets/images" )) );

//Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Import routes and give the server access to them 
var routes = require("./controllers/burgers_controller.js")

app.use("/", routes);

app.listen(port);

//create router for the app 
// app.get("/", function(req, res) {
//   connection.query("SELECT * FROM burgers;", function(err, data) {
//     if (err) {
//       throw err;
//     }

//     res.render("index", { burgers: data });

//   });
// });

// app.post("/", function(req, res) {
//   connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger_name], function(err, result) {
//     if (err) {
//       throw err;
//     }
//     res.redirect("/");
//   });
// });

// app.delete("/:id", function(req, res) {
//   connection.query("DELETE FROM burgers WHERE id = ?", [req.params.id], function(err, result) {
//     if (err) {
//       throw err;
//     }
//     res.redirect("/");
//   });
// });

// app.put("/", function(req, res) {

//   connection.query("UPDATE burgers SET burger_name = ? WHERE id = ?", [
//     req.body.burger_name, req.body.id
//   ], function(err, result) {
//     if (err) {
//       throw err;
//     }
//     res.redirect("/");
//   });
// });
