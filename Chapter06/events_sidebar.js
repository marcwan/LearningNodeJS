
var events = require('events');

function Downloader () {
}

Downloader.prototype = new events.EventEmitter();
Downloader.prototype.__proto__ = events.EventEmitter.prototype;
Downloader.prototype.url = null;

/**
 * Well use the setTimeout function here to simulate what a
 * download function would seem like -- it would take a while
 * to get the file and then call a function when it's done.
 */
Downloader.prototype.download_url = function (path) {
    var self = this;
    self.url = path;
    self.emit('start', path);
    setTimeout(function () {
        self.emit('end', path);
    }, 2000);
}

var d = new Downloader();

d.on("start", function (path) {
    console.log("started downloading: " + path);
});
d.on("end", function (path) {
    console.log("finished downloading: " + path);
});


d.download_url("http://marcwan.com");
