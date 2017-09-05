//Import MySQL connection & require connection.js
var connection = require("../config/connection.js")

//create the methods that will execute the necessary MySQL commands in the controllers. 

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
      arr.push(key + "=" + ob[key]);
  }

  return arr.toString();
}

// * `selectAll()` 
var orm = {
    all: function(tableInput, cb){
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result){
            if(err){
                throw err;
            }
            cb(result);
        })
    },
// * insertOne()
    create: function(table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result){
            if(err){
                throw err;
            }
            cb(result);
        })
    },

//* updateOne()
    update: function(table, objColVals, condition, cb){
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition; 

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err){
                throw(err);
            }
            cb(result);
        })
    }
}
    
//export the ORM object in module.exports

module.exports = orm;
