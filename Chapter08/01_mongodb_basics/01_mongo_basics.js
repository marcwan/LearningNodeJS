var MongoClient = require('mongodb').MongoClient,
    async = require('async');

// Connection URL
var url = 'mongodb://localhost:27017/photosharingapp';

var db;
var albums, photos;


/**
 * Don't forget that for waterfall, it will stop and call the final
 * "cleanup" function whenever it sees an error has been passed to 
 * one of the callback functions.
 *
 * Also, if a parameter is given to the callback, it will include
 * those in the next function called in the waterfall.
 */
async.waterfall([
    function (cb) {
        console.log("1. ------- connect --");
        // Use connect method to connect to the Server
        MongoClient.connect(url, {
                                db: {
                                    w: 1
                                },
                                server: {
                                    maxPoolSize: 200
                                },
                            },
                            function(err, dbase) {
                                if (err) return cb(err);
                                console.log("Connected correctly to server");
                                db = dbase;
                                cb(null);
                            });
    },
    // 2. create collections for our albums and photos
    function (cb) {
        console.log("\n** 2. create albums and photos collections.");
        db.collection("albums", cb);
    },

    function (albums_coll, cb) {
        albums = albums_coll;
        db.collection("photos", cb);
    },

    // 3. verify that creating a new album w same name errors out
    function (photos_coll, cb) {
        console.log("\n** 3. verify can't re-create collection if strict.");
        photos = photos_coll;
        db.collection("albums", {strict: true}, function (err, results) {
            if (err) {
                console.log(JSON.stringify(err, 0, 2));
                console.log("Got EXPECTED error re-creating albums.");
                cb(null);
                return;
            }
            cb({ error: "unexpected", message: "I didn't get an error."});
        });
    },

    // 4. let's add some albums now
    function (cb) {
        var docs = [{ _id: "italy2012",
                      name:"italy2012",
                      title:"Spring Festival in Italy",
                      date:"2012/02/15",
                      description:"I went to Italy for Spring Festival."
                    },
                    { _id:"australia2010",
                      name:"australia2010",
                      title:"Vacation Down Under",
                      date:"2010/10/20",
                      description:"Visiting some friends in Oz!"
                    },
                    { _id:"japan2010",
                      name:"japan2010",
                      title:"Programming in Tokyo",
                      date:"2010/06/10",
                      description:"I worked in Tokyo for a while."
                    }];

        console.log("\n** 4. add albums.");
        albums.insertMany(docs, { safe: true }, cb);
    },

    // 5. let's add some photos to albums
    function (results, cb) {
        console.log("added albums: ");

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
              date: "2010/06/12 08:30:40" },
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

        console.log("\n** 5. Add pictures.");
        photos.insertMany(pix, { safe: true }, cb);
    },

    function (results, cb) {
        console.log("added photos to albums:");

        // 6. list all albums
        console.log("\n** 6. list albums.");
        albums.find().toArray(cb);
    },

    function (all_albums, cb) {
        console.log("dumping albums:");
        for (var i = 0; i < all_albums.length; i++) {
            console.log("Album: " + all_albums[i].name
                        + " (" + all_albums[i].date + ")");
        }

        // 7. find italy2012 album.
        console.log("\n** 7. Find album.");
        albums.find({ _id: "italy2012" }).toArray(cb);
    },

    function (italy2012, cb) {
        console.log("fetching italy2012:");

        // 8. find all photos in italy2012 album. sort by date,
        //    and return subset
        console.log("\n** 8. Photos for albums.");
        photos.find({ albumid: "italy2012" })
            .sort({ date: 1 })
            .limit(5)
            .skip(2)
            .toArray(cb);
    },

    function (italy2012_photos, cb) {
        console.log("searching for photos in italy2012:");
        for (var i = 0; i < italy2012_photos.length; i++) {
            console.log("Photo: " + italy2012_photos[i].filename
                        + " (" + italy2012_photos[i].date + ")");
        }


        // 9. replace the description in a photo
        console.log("\n** 9. update photo.");
        photos.updateOne({ filename: "photo_03.jpg", albumid: "japan2010" },
                         { $set: { description: "NO SHINJUKU! BAD!" } },
                         { safe: true },
                         cb);
    },

    function (results, cb) {
        console.log("Updated photo_03.jpg in Japan2010");

        // 10. delete a photo
        console.log("\n** 10. delete photo.");
        photos.deleteOne({ filename: "photo_04.jpg", albumid: "japan2010" },
                         { safe: true },
                         cb);
    },

    function (number_deleted, cb) {
        console.log("Deleted " + number_deleted + " photos.");

        // 11. delete an entire album and its photos.
        //  a. delete album object.
        console.log("\n** 11. Delete entire album.");
        albums.remove({ _id: "australia2010"},
                      { safe: true },
                      cb);
    },

    function (number_deleted, cb) {
        console.log("Deleted " + number_deleted + " albums.");

        //  b. delete the photos in it.
        photos.deleteMany({ albumid: "australia2010" },
                          { safe: true },
                          cb);
    },

    function (number_deleted, cb) {
        console.log("Deleted " + number_deleted + " photos.");

        // 12. ask for an album that doesn't exist.
        console.log("\n** 12. Search for non-existant album.");
        albums.find({ _id: "france2014" }).toArray(cb);
    },

    function (results, cb) {
        console.log("Results of search for france2014:");
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

    db.close();
});


