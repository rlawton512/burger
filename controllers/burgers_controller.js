//import Express 
var express = require("express");

var router = express.Router();
// var app = express();
//require burger.js
var burger = require("../models/burgers.js");

//create router for the app 
router.get("/", function(req, res) {
  burger.all(function(data){
    var hbsObject = {
      burgers: data
    }
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "burger_name"
  ]), [
    req.body.burger_name
  ], function() {
    res.redirect("/");
  };
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: true
  }, condition, function(){
    res.redirect("/");
  })
});


// router.put("/:id", function(req, res) {

//   connection.query("UPDATE burgers SET burger_name = ? WHERE id = ?", [
//     req.body.burger_name, req.body.id
//   ], function(err, result) {
//     if (err) {
//       throw err;
//     }
//     res.redirect("/");
//   });
// });
//export router
module.exports = router; 