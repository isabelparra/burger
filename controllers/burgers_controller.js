var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

router.get('/', function(req, res) {
    burger.all(function(burger_data){
        console.log(burger_data);
        res.render('index', {burger_data});
    })
})

// router.get("/", function(req, res) {
//     burger.all(function(data) {
//         var hbsObject = {
//             burgers: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

router.post("/burgers/create", function(req, res) {
    burger.create(req.body.burger_name, function(result) {
        // Send back the ID of the new burger
        console.log(result);
        res.redirect('/');

    });
});

router.put("/burgers/update", function(req, res) {
    burger.update(req.body.burger_id, function(result) {
        console.log(result);
        res.redirect('/');
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if(result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });

});

// Export routes for server.js to use.
module.exports = router;
