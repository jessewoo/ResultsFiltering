var express = require('express');
var router = express.Router();

// Configure multer package to handle file upload effort
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("Directory: " + req.query.dir);
        if (req.query.dir) {
            cb(null, './public/file-uploads/' + req.query.dir);
        } else {
            cb(null, './public/file-uploads');
        }

    },
    filename: function (req, file, cb) {
        console.log("!!! Uploaded file ->", file)
        cb(null, file.originalname)
    }
})
var upload = multer({storage: storage}).single('file');

// Image upload test page
router.get('/', function (req, res, next) {
    res.render('upload/file', {title: 'File Upload'});
});

// Create image file
router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log("Error uploading file.", err);
            return res.end("Error uploading file.", err);
        }
        res.end("File is uploaded");
    });
});

module.exports = router;
