// Import MySQL connection
var connection = require("./connection.js");

// Object for all of SQL statement functions
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw (err);
            }
            cb(result);
        })
    },
    update: function(tableInput, condition, cb) {
        connection.query('UPDATE ' + tableInput + ' SET devoured=true WHERE id=' +condition+ ';', 
        function(err, result) {
            if (err) throw err;
            cb(result);
        })
    }, 
    create: function(tableInput, val, cb) {
        connection.query("INSERT INTO " + tableInput +" (burger_name) VALUES ('"+val+"');", function(err, result) {
            if(err) throw err;
            cb(result);
        })
    // },
    // delete: function(table, condition, cb) {
    // var queryString = "DELETE FROM " + table;
    // queryString += " WHERE ";
    // queryString += condition;

    // connection.query(queryString, function(err, result) {
    //     if (err) {
    //         throw err;
    //     }
    //     cb(result);
    // });
}
};

// Helper function for SQL sytanx
function print(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = " ' " + value + "'";
            }
            arr.push(key + "=" + value);
        }
      }

    return arr.toString();
}

// Export the orm object for the model (cat.js)
module.exports = orm;