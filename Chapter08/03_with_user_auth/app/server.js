
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

app.get('/v1/albums.json', album_hdlr.list_all);
app.get('/v1/albums/:album_name.json', album_hdlr.album_by_name);
app.put('/v1/albums.json', requireAPILogin, album_hdlr.create_album);

app.get('/v1/albums/:album_name/photos.json', album_hdlr.photos_for_album);
app.put('/v1/albums/:album_name/photos.json',
        requireAPILogin, album_hdlr.add_photo_to_album);


// add-on requests we support for the purposes of the web interface
// to the server.
app.get('/pages/admin/:sub_page',
        requirePageLogin, page_hdlr.generateAdmin);
app.get('/pages/:page_name', page_hdlr.generate);
app.get('/pages/:page_name/:sub_page', page_hdlr.generate);
app.post('/service/login', user_hdlr.login);

app.put('/v1/users.json', user_hdlr.register);
app.get('/v1/users/:display_name.json', user_hdlr.user_by_display_name);


app.get("/", function (req, res) {
    res.redirect("/pages/home");
    res.end();
});

app.get('*', four_oh_four);

function four_oh_four(req, res) {
    res.writeHead(404, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(helpers.invalid_resource()) + "\n");
}


function requireAPILogin(req, res, next) {
    // if they're using the API from the browser, then they'll be auth'd
    if (req.session && req.session.logged_in) {
        next();
        return;
    }
    var rha = req.headers.authorization;
    if (rha && rha.search('Basic ') === 0) {
        var creds = new Buffer(rha.split(' ')[1], 'base64').toString();
        var parts = creds.split(":");
        user_hdlr.authenticate_API(
            parts[0],
            parts[1],
            function (err, resp) {
                if (!err && resp) {
                    next();
                } else
                    need_auth(req, res);
            }
        );
    } else
        need_auth(req, res);
}


function requirePageLogin(req, res, next) {
    if (req.session && req.session.logged_in) {
        next();
    } else {
        res.redirect("/pages/login");
    }
}

function need_auth(req, res) {
    res.header('WWW-Authenticate',
               'Basic realm="Authorization required"');
    if (req.headers.authorization) {
        // no more than 1 failure / 5s
        setTimeout(function () {
            res.send('Authentication required\n', 401);
        }, 5000);
    } else {
        res.send('Authentication required\n', 401);
    }
}



db.init(function (err, results) {
    if (err) {
        console.error("** FATAL ERROR ON STARTUP: ");
        console.error(err);
        process.exit(-1);
    }

    console.log("Initialisation complete. Running Server.");
    app.listen(8080);
});


