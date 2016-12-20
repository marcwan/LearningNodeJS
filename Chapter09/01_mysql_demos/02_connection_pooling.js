
var mysql = require('mysql'),
    async = require('async');

var host = "localhost";
var database = "PhotoAlbums";
var user = "root";
var password = "secret";


/**
 * Don't forget that for waterfall, it will stop and call the final
 * "cleanup" function whenever it sees an error has been passed to 
 * one of the callback functions.
 *
 * Also, if a parameter is given to the callback, it will include
 * those in the next function called in the waterfall.
 */
var dbpool;

async.waterfall([

    // 1. create database connection
    function (cb) {
        console.log("\n** 1. create connection.");
        dbpool = mysql.createPool({
            connectionLimit: 200,
            host: host,
            user: user,
            password: password,
            database: database,
        });
        cb(null);
    },

    // 2. let's add a couple of albums. we will run them as separate
    //    queries.
    function (cb) {
        console.log("\n** 2. create albums.");
        dbpool.query(
            "INSERT INTO Albums VALUES (?, ?, ?, ?)",
            [ "italy2012", "Spring Festival in Italy", "2012-02-15",
              "I went to Italy for Spring Festival" ],
            cb);
    },

    function (results, fields, cb) {
        console.log(arguments);
        console.log(fields);
        console.log("\n** 2b. create albums.");
        dbpool.query(
            "INSERT INTO Albums VALUES (?, ?, ?, ?)",
            [ "australia2010", "Vacation Down Under", "2010-10-20",
              "Spent some time in Australia visiting Friends" ],
            cb);
    },

    function (results, fields, cb) {
        console.log(fields);
        console.log("\n** 2c. create albums.");
        dbpool.query(
            "INSERT INTO Albums VALUES (?, ?, ?, ?)",
            [ "japan2010", "Programming in Tokyo", "2010/06/10",
              "I worked in Tokyo for a while." ],
            cb);
    },

    // 3. let's add some photos to albums
    function (results, fields, cb) {
        console.log(fields);
        // mysql is cool with this date format.
        var pix = [
            { filename: "picture_01.jpg",
              albumid: "italy2012",
              description: "rome!",
              date: "2012/02/15 16:20:40" },
            { filename: "picture_04.jpg",
              albumid: "italy2012",
              description: "fontana di trevi",
              date: "2012/02/19 16:20:40" },
            { filename: "picture_02.jpg",
              albumid: "italy2012",
              description: "it's the vatican!",
              date: "2012/02/17 16:35:04" },
            { filename: "picture_05.jpg",
              albumid: "italy2012",
              description: "rome!",
              date: "2012/02/19 16:20:40" },
            { filename: "picture_03.jpg",
              albumid: "italy2012",
              description: "spanish steps",
              date: "2012/02/18 16:20:40" },

            { filename: "photo_05.jpg",
              albumid: "japan2010",
              description: "something nice",
              date: "2010/06/14 12:21:40" },
            { filename: "photo_01.jpg",
              albumid: "japan2010",
              description: "tokyo tower!",
              date: "2010/06/11 12:20:40" },
            { filename: "photo_06.jpg",
              albumid: "japan2010",
              description: "kitty cats",
              date: "2010/06/14 12:23:40" },
            { filename: "photo_03.jpg",
              albumid: "japan2010",
              description: "shinjuku is nice",
              date: "2010/06/12 08:40:40" },
            { filename: "photo_04.jpg",
              albumid: "japan2010",
              description: "eating sushi",
              date: "2010/06/12 08:34:40" },
            { filename: "photo_02.jpg",
              albumid: "japan2010",
              description: "roppongi!",
              date: "2010/06/12 07:44:40" },
            { filename: "photo_07.jpg",
              albumid: "japan2010",
              description: "moo cow oink pig woo!!",
              date: "2010/06/15 12:55:40" },

            { filename: "photo_001.jpg",
              albumid: "australia2010",
              description: "sydney!",
              date: "2010/10/20 07:44:40" },
            { filename: "photo_002.jpg",
              albumid: "australia2010",
              description: "asdfasdf!",
              date: "2010/10/20 08:24:40" },
            { filename: "photo_003.jpg",
              albumid: "australia2010",
              description: "qwerqwr!",
              date: "2010/10/20 08:55:40" },
            { filename: "photo_004.jpg",
              albumid: "australia2010",
              description: "zzzxcv zxcv",
              date: "2010/10/21 14:29:40" },
            { filename: "photo_005.jpg",
              albumid: "australia2010",
              description: "ipuoip",
              date: "2010/10/22 19:08:40" },
            { filename: "photo_006.jpg",
              albumid: "australia2010",
              description: "asdufio",
              date: "2010/10/22 22:15:40" }
        ];

        var q = "\
INSERT INTO Photos (filename, album_name, description, date) \
            VALUES (?, ?, ?, ?)";

        console.log("\n** 3. Add pictures.");
        async.forEachSeries(
            pix,
            // run the query and call clbk to do next in array
            // we do in serial because connection only does
            // one thing at a time.
            function (item, clbk) {
                dbpool.query(
                    q, 
                    [ item.filename, item.albumid,
                      item.description, item.date ],
                    clbk);
            },
            cb);
    },

    function (cb) {
        console.log(arguments);
        // 4. list all albums
        console.log("\n** 4. list albums");
        dbpool.query("SELECT * FROM Albums ORDER BY date DESC", cb);
    },

    function (rows, fields, cb) {
        console.log(fields);
        console.log(" -> dumping albums:");
        for (var i = 0; i < rows.length; i++) {
            console.log(" -> Album: " + rows[i].name
                        + " (" + rows[i].date + ")");
        }

        // 5. find italy2012 album.
        console.log("\n** 5. Find album.");
        dbpool.query(
            "SELECT * FROM Albums WHERE name = ?",
            [ "italy2012" ],
            cb);
    },

    function (rows, fields, cb) {
        console.log(fields);
        console.log(" -> dumping italy2012:");
        for (var i = 0; i < rows.length; i++) {
            console.log(" -> Album: " + rows[i].name
                        + " (" + rows[i].date + ")");
        }

        // 6. find all photos in italy2012 album. sort by date,
        //    and return subset
        console.log("\n** 6. Photos for albums.");
        var q = "\
SELECT * FROM Photos WHERE album_name = ?\
       ORDER BY date DESC LIMIT ?, ?";

        dbpool.query(q, ["italy2012", 2, 5 ], cb);
    },

    function (rows, fields, cb) {
        console.log(fields);
        console.log(" -> dumping italy2012 photos:");
        for (var i = 0; i < rows.length; i++) {
            console.log("Photo: " + rows[i].filename
                        + " (" + rows[i].date + ")");
        }

        // 7. replace the description in a photo
        console.log("\n** 7. update photo.");
        dbpool.query(
            "UPDATE Photos SET description = ? \
             WHERE album_name = ? AND filename = ?",
            [ "NO SHINJUKU! BAD!", "italy2012", "picture_03.jpg" ],
            cb);
    },

    function (results, fields, cb) {
        console.log(fields);
        console.log(results);
        console.log(" -> updated rows: " + results.affectedRows);
        if (results.affectedRows != 1) {
            cb(new Error("CRAP TEST 7 didn't affect 1 row!"));
            return;
        }

        // 8. delete a photo
        console.log("\n** 8. delete photo.");
        dbpool.query(
            "DELETE FROM Photos WHERE filename = ? AND album_name = ?",
            [ "photo_04.jpg", "japan2010" ],
            cb);
    },

    function (results, fields, cb) {
        console.log(fields);
        console.log(results);
        console.log(" -> deleted rows: " + results.affectedRows);
        if (results.affectedRows != 1) {
            cb(new Error("CRAP TEST 8 didn't affect 1 row!"));
            return;
        }

        // 9. delete an entire album and its photos.
        // a. delete photos
        console.log("\n** 9. delete entire album and photos");
        dbpool.query(
            "DELETE FROM Photos WHERE album_name = ?",
            [ "australia2012" ],
            cb);
    },

    function (results, fields, cb) {
        console.log(fields);
        console.log(" -> delete photos rows: " + results.affectedRows);
        console.log(results);

        //  b. delete the album
        dbpool.query(
            "DELETE FROM Albums WHERE name = ?",
            [ "australia2012" ],
            cb);
    },

    function (results, fields, cb) {
        console.log(fields);
        console.log(" -> delete album rows: " + results.affectedRows);
        console.log(results);

        // 10. ask for an album that doesn't exist.
        console.log("\n** 10. Search for non-existant album.");
        dbpool.query(
            "SELECT * FROM Albums WHERE name = ?",
            [ "asdfasdf" ],
            cb);
    },

    function (rows, fields, cb) {
        console.log(fields);
        console.log(" -> asked for bogus, got " + rows.length + " rows");
        cb(null);
    }
],
// waterfall cleanup function
function (err, results) {
    if (err) {
        console.log("Aw, there was an error: ");
        console.log(err);
    } else {
        console.log("All operations completed without error.");
    }

    dbpool.end();
});



