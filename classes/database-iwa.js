var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var monk    = require('monk');
var db      = monk('localhost:27017/iwa');

var mdb = require('mongodb');

// Config options
var url = 'mongodb://localhost:27017/iwa';

// ============================================================
// Public functions
exports.load = function (object, collection, callback) {
    createWrapper(object, collection, callback);
};

exports.get = function (object, callback) {
    readWrapper(object, callback);
};

exports.one = function (mongo_id, collection, callback) {
    oneWrapper(mongo_id, collection, callback);
};

exports.remove = function (target, collection, callback) {
    console.log("Top -", target);
    deleteWrapper(target, collection, callback);
};

// ============================================================
// Private (meta) functions
var createWrapper = function (object, collection, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        insertProject(db, object, collection, function (result) {
            end(db);
            callback(result);
        });
    });
};

var readWrapper = function (object, callback) {
    MongoClient.connect(url, function (err, db) {
        console.log("+1 DB connection with: " + db);
        assert.equal(null, err);
        var docHolder;
        findDocuments(db, object, function (docHolder) {
            end(db);
            callback(docHolder);
        });
    });
};

var oneWrapper = function (mongo_id, collection, callback) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        findOneDocument(db, mongo_id, collection, function (result) {
            end(db);
            callback(result);
        });
    });
};

var updateWrapper = function (object, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        updateDocument(db, object[0], function (result) {
            end(db);
            callback(result);
        });
    });
};

var deleteWrapper = function (target, collection, callback) {
    MongoClient.connect(url, function (err, db) {
        //console.log("+1 DB connection");
        assert.equal(null, err);
        removeDocument(db, target.id, collection, function (result) {
            end(db);
            callback(result);
        });
    });
};

// ============================================================
// Individual functions

// Disconnect
var end = function (db) {
    db.close();
    console.log("-1 DB close");
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

// Remove
var removeDocument = function (db, target, collection, callback) {
    // Get the documents collection
    console.log("About to remove [", target, "] from [", collection, "]");
    var my_collection = db.collection(collection);
    // Verify passed mongo db id is valid hex
    var pattern = /[0-9A-F]{24}/i;
    var check = pattern.test(target);
    if (check) {
        console.log("This is valid hex [", target, "]");
        my_collection.remove({_id: new mdb.ObjectID(target)}, function (err, result) {
            assert.equal(err, null);
            //console.log("Result: " + result);
            callback(result);
        });
    } else {
        console.log("INVALID HEX!!! [", target, "]");
        callback(undefined);
    }
};

// Find one motm_articles (by mongo db id)
var findOneDocument = function (db, id, collection, callback) {
    console.log("Finding documenet in the database ->", id);
    var my_collection = db.collection(collection);
    // Verify passed mongo db id is valid hex
    var pattern = /^[0-9A-F]{24}$/i;
    var check = pattern.test(id);
    if (check) {
        console.log("This is valid hex [", id, "]");
        my_collection.find({_id: new mdb.ObjectID(id)}).toArray(function (err, docArray) {
            assert.equal(err, null);
            //console.log("docArray", docArray);
            callback(docArray[0])
        });
    } else {
        console.log("INVALID HEX!!! [", id, "]");
        callback(undefined);
    }
};

// Insert
var insertProject = function (db, object, collection, callback) {
    // Get the documents collection
    console.log("About to insert to [", collection, "]");
    var my_collection = db.collection(collection);
    // Insert the document
    my_collection.insert(object, function (err, result) {
        assert.equal(err, null);
        assert.equal(object.length, result.length);
        // console.log("Result: " + JSON.stringify(result));
        callback(result);
    });
}