
var express = require('express');
var app = express();

var db = require('./data/db.js'),
    album_hdlr = require('./handlers/albums.js'),
    page_hdlr = require('./handlers/pages.js'),
    user_hdlr = require('./handlers/users.js'),
    helpers = require('./handlers/helpers.js');

app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true }));
app.use(express.static(__dirname + "/../static"));
app.use(express.cookieParser("kitten on  keyboard"));
app.use(express.cookieSession({
    secret: "FLUFFY BUNNIES",
    maxAge: 86400000
}));

/**
 * API Server requests.
 */
app.get('/v1/albums.json', album_hdlr.list_all);
app.get('/v1/albums/:album_name.json', album_hdlr.album_by_name);
app.put('/v1/albums.json', album_hdlr.create_album);

app.get('/v1/albums/:album_name/photos.json', album_hdlr.photos_for_album);
app.put('/v1/albums/:album_name/photos.json', album_hdlr.add_photo_to_album);

app.put('/v1/users.json', user_hdlr.register);


/**
 * add-on requests we support for the purposes of the web interface
 * to the server.
 */
app.get('/pages/:page_name', requirePageLogin, page_hdlr.generate);
app.get('/pages/:page_name/:sub_page', requirePageLogin, page_hdlr.generate);
app.post('/service/login', user_hdlr.login);


app.get("/", function (req, res) {
    res.redirect("/pages/home");
    res.end();
});

app.get('*', four_oh_four);

function four_oh_four(req, res) {
    res.writeHead(404, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(helpers.invalid_resource()) + "\n");
}

function requirePageLogin(req, res, next) {
    if (req.params && req.params.page_name == 'admin') {
        if (req.session && req.session.logged_in) {
            next();
        } else {
            res.redirect("/pages/login");
        }
    } else
        next();
}

require('./data/db.js').init(function (err) {
    if (err) {
        console.log("\nFATAL ERROR INITIALISING DATABASE:");
        console.log(err);
    } else {
        app.listen(8080);
    }
});

