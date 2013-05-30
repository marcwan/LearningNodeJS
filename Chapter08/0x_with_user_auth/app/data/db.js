var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    async = require('async'),
    local = require("../local.config.js");

var host = local.config.db_config.host
    ? local.config.db_config.host
    : 'localhost';
var port = local.config.db_config.port
    ? local.config.db_config.port
    : Connection.DEFAULT_PORT;
var ps = local.config.db_config.poolSize
    ? local.config.db_config.poolSize : 5;

var db = new Db('PhotoAlbums', 
                new Server(host, port, 
                           { auto_reconnect: true,
                             poolSize: ps}),
                { w: 1 });

/**
 * Currently for initialisation, we just want to open
 * the database.  We won't even attempt to start up
 * if this fails, as it's pretty pointless.
 */
exports.init = function (callback) {
    async.waterfall([
        // 1. open database connection
        function (cb) {
            console.log("** 1. open db");
            db.open(cb);
        },

        // 2. create collections for our albums and photos. if
        //    they already exist, then we're good.
        function (db_conn, cb) {
            console.log("** 2. create albums and photos collections.");
            db.collection("albums", cb);
        },

        function (albums_coll, cb) {
            exports.albums = albums_coll;
            db.collection("photos", cb);
        },

        function (photos_coll, cb) {
            exports.photos = photos_coll;
            db.collection("users", cb);
        },

        function (users_coll, cb) {
            exports.users = users_coll;
            cb(null);
        }
    ], callback);
};


exports.albums = null;
exports.photos = null;
exports.users = null;

