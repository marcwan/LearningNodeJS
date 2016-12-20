var MongoClient = require('mongodb').MongoClient,
    async = require('async'),
    local = require("../local.config.json");

/**
 * We'll keep this private and not share it with anybody.
 */
var db;

/**
 * Currently for initialisation, we just want to open
 * the database.  We won't even attempt to start up
 * if this fails, as it's pretty pointless.
 */
exports.init = function (callback) {
    async.waterfall([
        // 1. open database connection
        function (cb) {
            console.log("\n** 1. open db");
            var url = local.config.db_config.host_url;
            MongoClient.connect(url, (err, dbase) => {
                if (err) return cb(err);
                console.log("**    Connected to server");
                db = dbase;
                cb(null);
            });
        },

        // 2. create collections for our albums and photos. if
        //    they already exist, then we're good.
        function (cb) {
            console.log("** 2. create albums and photos collections.");
            db.collection("albums", cb);
        },

        function (albums_coll, cb) {
            exports.albums = albums_coll;
            db.collection("photos", cb);
        },

        function (photos_coll, cb) {
            exports.photos = photos_coll;
            cb(null);
        }
    ], callback);
};


exports.albums = null;
exports.photos = null;


