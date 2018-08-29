var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var burgerObj = {
            burgers: data
        };
        console.log(burgerObj);
        res.render("index", burgerObj);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "name", false
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        // Send back the ID of the new burger
        res.json({ id: result.insertId});

    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            // if no rows were changed, then the id must not exist
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
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
