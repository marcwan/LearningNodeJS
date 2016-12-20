
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    multer = require('multer');

var db = require('./data/db.js'),
    album_hdlr = require('./handlers/albums.js'),
    page_hdlr = require('./handlers/pages.js'),
    helpers = require('./handlers/helpers.js');

var app = express();

app.use(express.static(__dirname + "/../static"));
app.use(morgan('dev'));

// Parse application/x-www-form-urlencoded & JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var upload = multer({ dest: "uploads/" });



app.get('/v1/albums.json', album_hdlr.list_all);
app.put('/v1/albums.json', album_hdlr.create_album);
app.get('/v1/albums/:album_name.json', album_hdlr.album_by_name);
app.get('/v1/albums/:album_name/photos.json', album_hdlr.photos_for_album);
app.put('/v1/albums/:album_name/photos.json',
        upload.single("photo_file"),
        album_hdlr.add_photo_to_album);

app.get('/pages/:page_name', page_hdlr.generate);
app.get('/pages/:page_name/:sub_page', page_hdlr.generate);


app.get("/", (req, res) => {
    res.redirect("/pages/home");
    res.end();
});

app.get('*', four_oh_four);

function four_oh_four(req, res) {
    res.writeHead(404, { "Content-Type" : "application/json" });
    res.end(JSON.stringify(helpers.invalid_resource()) + "\n");
}


/**
 * Initialise the server and start listening when we're ready!
 */
db.init( (err, results) => {
    if (err) {
        console.error("** FATAL ERROR ON STARTUP: ");
        console.error(err);
        process.exit(-1);
    }

    console.log("** Database initialised, listening on port 8080");
    app.listen(8080);
});

