var express = require('express');
var router = express.Router();

// Mongo Database related
var database = require('../classes/database-iwa.js');


// RENDERS of iwa/
// Provide the list of all the characters in Star Wars
router.get('/', function(req, res, next) {
  res.render('iwa/index', { title: 'Interview Wizard Application (IWA)' });
});

// Load FORM a Star Wars character that can be edited
router.get('/edit/:id', function (req, res) {
    console.log("Editing ->", req.params.id);
    res.render('starwars/editor', {postTitle: 'Edit - ' + req.params.id + ' Star Wars Character'});
});



// ============================================================
// REST url's

// Returns the entire content of a collection - Currently the only collection is:
// (1) Characters = ":collection"
router.get('/all/:collection', function (req, res) {
  returnAll(req.params.collection, res);
});

// Return one document from ANY collection where the MongoDB ID matches
router.get('/one/mongo/:collection/:id', function (req, res) {
    returnOne(req.params.id, req.params.collection, res);
});


// Insert (add) mongodb object
router.post('/save/:collection', function (req, res) {
    // Extract & log
    var body = req.body;
    console.log("CRUD - Received SAVE request to [" + req.params.collection + "] : " + JSON.stringify(body));
    // Perform the database load (add) operation on the created object
    returnCreate(body, req.params.collection, res);
});

// Delete (remove) mongodb object
router.delete('/del/:collection', function (req, res) {
    // Extract & log
    var body = req.body;
    console.log("CRUD - Received DELETE request from [" + req.params.collection + "] ID: " + JSON.stringify(body));
    //console.log("CRUD - Received DELETE request from [" + req.params.collection + "] ID: " + body);

    // Perform removal from database
    database.remove(body, req.params.collection, function (toSend) {
        res.send(toSend);
    });
});

module.exports = router;

// ===================================================================
// Helper function with async callback - for read
var returnAll = function (collection, res) {
  database.get(collection, function (toSend) {
    res.send(toSend);
  });
};

// Helper function with async callback - for read single document
var returnOne = function (mongo_id, collection, res) {
    database.one(mongo_id, collection, function (toSend) {
        res.send(toSend);
    });
};


// Helper function with async callback - for create
var returnCreate = function (toLoad, collection, res) {
    database.load(toLoad, collection, function (toSend) {
        res.send(toSend);
    });
};

// Helper function with async callback - for update
var returnUpdate = function (toLoad, res) {
    database.update(toLoad, function (toSend) {
        res.send(toSend);
    });
};


