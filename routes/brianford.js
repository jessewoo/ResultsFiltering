var express = require('express');
var router = express.Router(),
    routes = require('./routes'),
    api = require('./routes/api');


exports.index = function(req, res){
    res.render('brianford/index');
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('brianford/partials/' + name);
};


// Routes

router.get('/', routes.index);
router.get('/partials/:name', routes.partials);

// JSON API

router.get('/api/posts', api.posts);

router.get('/api/post/:id', api.post);
router.post('/api/post', api.addPost);
router.put('/api/post/:id', api.editPost);
router.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
router.get('*', routes.index);