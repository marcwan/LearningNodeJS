
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
    maxAge: 86400000
}));

app.get('/v1/albums.json', album_hdlr.list_all);
app.put('/v1/albums.json', album_hdlr.create_album);
app.get('/v1/albums/:album_name.json', album_hdlr.album_by_name);

app.get('/v1/albums/:album_name/photos.json', album_hdlr.photos_for_album);
app.put('/v1/albums/:album_name/photos.json', album_hdlr.add_photo_to_album);

app.get('/pages/:page_name', page_hdlr.generate);
app.get('/pages/:page_name/:sub_page', requireLogin, page_hdlr.generate);

app.put('/v1/users.json', user_hdlr.register);
app.post('/v1/users/login.json', user_hdlr.login);
app.get('/v1/users/logged_in.json', user_hdlr.logged_in);


app.get("/", function (req, res) {
    res.redirect("/pages/home");
    res.end();
});

app.get('*', four_oh_four);

function four_oh_four(req, res) {
    res.writeHead(404, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(helpers.invalid_resource()) + "\n");
}


function requireLogin(req, res, next) {
    // all pages are always approved if you're logged in.
    if (req.session && req.session.logged_in_email_address)
        next();  // continue
    else if (req.param.page_name == 'admin') {
        res.redirect("/pages/login");  // force login for admin pages
        res.end();
    } else
        next();  // continue
}



db.init(function (err, results) {
    if (err) {
        console.error("** FATAL ERROR ON STARTUP: ");
        console.error(err);
        process.exit(-1);
    }

    app.listen(8080);
});

