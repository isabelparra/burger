// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        })
    },
    // The variable cols and vals are arrays.
    create: function(name, cb) {
        orm.create("burgers", name, cb);
    },
    
    update: function(id, cb) {
        orm.update("burgers", id, cb);
    }
    
// },
//     delete: function(condition, cb) {
//         orm.delete("burgers", condition, function(res) {
//             cb(res);
//         });
 
//     }
};

// Export the database functions for the controller 
module.exports = burger;