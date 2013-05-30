var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    Binary = require('mongodb').Binary;
    async = require('async');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : Connection.DEFAULT_PORT;


var db = new Db('Test', 
                new Server(host, port, 
                           { auto_reconnect: true,
                             poolSize: 20}),
                { w: 1 });

var testcoll


/**
 * Don't forget that for waterfall, it will stop and call the final
 * "cleanup" function whenever it sees an error has been passed to 
 * one of the callback functions.
 *
 * Also, if a parameter is given to the callback, it will include
 * those in the next function called in the waterfall.
 */
async.waterfall([

    // 1. open database connection
    function (cb) {
        console.log("\n** 1. open db");
        db.open(cb);
    },

    // 2. create collections for our albums and photos
    function (db, cb) {
        console.log("\n** 2. create albums and photos collections.");
        db.createCollection("testcoll", cb);
    },

    function (testc, cb) {
        testcoll = testc;
        testcoll.insert(
            { _id: "test",
                    data: new Binary(new Buffer("asdf")) },
            { safe: true },
            cb);
    },

    function (data, cb) {
        console.log("INSERTED: ");
        console.log(data);
        cb(null);
    },

    function (cb) {
        testcoll.find({ _id: "test" }).toArray(function (err, res) {
            console.log(err);
            console.log(res);
            });
    }
                    ],

    function (err, results) {
        console.log("ERR??:" + JSON.stringify(err));
    }
);
