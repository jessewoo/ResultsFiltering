var express = require('express');
var router = express.Router();

// Mongo Database related
var database = require('../classes/database-iwa.js');


// RENDERS of Tutorial from Brian Ford
// http://briantford.com/blog/angular-express

router.get('/', function(req, res, next) {
    res.render('brianford/index', { title: 'Tutorial' });
});


// ============================================================
// REST url's

module.exports = router;


// ===================================================================
// Helper function with async callback - for read