var express = require('express');
var router = express.Router();


/* home page. */
router.get('/', function(req, res, next) {
  res.render('emailapp/index', { title: 'Sample AngularJS Controller' });
});

module.exports = router;