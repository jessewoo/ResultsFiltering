var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var monk    = require('monk');
var db      = monk('localhost:27017/starwars');



var mdb = require('mongodb');

// Config options
var url = 'mongodb://localhost:27017/starwars';


// ============================================================
// Public functions

exports.get = function (object, callback) {
    readWrapper(object, callback);
};



// ============================================================
// Private (meta) functions
var readWrapper = function (object, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        var docHolder;
        findDocuments(db, object, function (docHolder) {
            end(db);
            callback(docHolder);
        });
    });
};



// ============================================================
// Individual functions

// Disconnect
var end = function (db) {
    db.close();
    //console.log("-1 DB close");
}

// Find all characters
var findDocuments = function (db, object, callback) {
    // Get the documents collection
    var collection = db.collection(object);
    // Find some documents
    collection.find({}).sort({id: -1}).toArray(function (err, docs) {
        assert.equal(err, null);
        // console.log("Found the following records");
        // console.dir(docs);
        callback(docs);
    });
};