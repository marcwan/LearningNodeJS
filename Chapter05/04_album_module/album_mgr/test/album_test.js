
var album_mgr = require('../lib/albums.js'),
    path = require('path');


album_mgr.albums(
    "./",
    function (err, albums) {
        if (err) {
            console.log("TEST FAILURE: can't load albums\n" 
                        + JSON.stringify(err));
            return;
        }

        (function iterator(index) {
            if (index == albums.length) {
                console.log("PASS!");
                return;
            }

            albums[index].photos(
                function (err, photos) {
                    if (err) {
                        console.log("TEST FAILURE: load album\n"
                                    + JSON.stringify(err));
                        return;
                    }

                    var a = albums[index];
                    console.log("Album: " + a.name
                                + "(" + a.path + ")");
                    for (var i = 0; i < photos.length; i++) {
                        console.log("  " + path.basename(photos[i]));
                    }
                    console.log("");
                    iterator(index+1);
                }
            );
        })(0);
    }
);
