// Set up MySQL connection
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    // port: 3306,
    user: "root",
    password: "NEWPASSWORD",
    database: "burgers_db"
});

// Make connection
connection.connect(function(err) {
    if (err) { 
        console.log("error connectiong: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

});

// Export connection for our ORM to use
module.exports = connection;