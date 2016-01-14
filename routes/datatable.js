var express = require('express');
var router = express.Router();

// Mongo Database related
var database = require('../classes/database-starwars.js');


// Provide the list of all the characters in Star Wars
router.get('/', function(req, res, next) {
  res.render('datatable', { title: 'DataTable Library' });
});

module.exports = router;




// ============================================================
// REST url's

// Returns the entire content of a collection
router.get('/all/:collection', function (req, res) {
  returnAll(req.params.collection, res);
});



// ===================================================================
// Helper function with async callback - for read
var returnAll = function (collection, res) {
  database.get(collection, function (toSend) {
    res.send(toSend);
  });
};