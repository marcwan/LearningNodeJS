
var request = require('request');

var h = "http://localhost:8080";

exports.no_albums = function (test) {
    test.expect(5);
    request.get(h + "/v1/albums.json", function (err, resp, body) {
        test.equal(err, null);
        test.equal(resp.statusCode, 200);
        var r = JSON.parse(body);
        test.equal(r.error, null);
        test.notEqual(r.data.albums, undefined);
        test.equal(r.data.albums.length, 0);
        test.done();
    });
};

exports.create_album = function (test) {
    var d = "We went to HK to do some shopping and spend new years. Nice!";
    var t = "New Years in Hong Kong";
    test.expect(7);
    request.put(
        { url: h + "/v1/albums.json",
          json: { name: "hongkong2012",
                         title: t,
                         description: d,
                  date: "2012-12-28" } },
        function (err, resp, body) {
            test.equal(err, null);
            test.equal(resp.statusCode, 200);
            test.notEqual(body.data.album, undefined);
            test.equal(body.data.album.name, "hongkong2012"),
            test.equal(body.data.album.date, "2012-12-28");
            test.equal(body.data.album.description, d);
            test.equal(body.data.album.title, t);
            test.done();
        }
    );
}

exports.fail_create_album = function (test) {
    test.expect(4);
    request.put(
        { url: h + "/v1/albums.json",
          headers: { "Content-Type" : "application/json" },
          json: { name: "hong kong 2012",
                         title: "title",
                         description: "desc",
                  date: "2012-12-28" } },
        function (err, resp, body) {
            test.equal(err, null);
            test.equal(resp.statusCode, 403);
            test.notEqual(body.error, null);
            test.equal(body.error, "invalid_album_name");
            test.done();
        }
    );
};
