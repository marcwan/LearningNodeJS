
var helpers = require('./helpers.js'),
    fs = require('fs');

exports.version = "0.1.0";

exports.generate = function (req, res) {
    var page = req.params.page_name;
    if (req.params.sub_page && req.params.page_name == 'admin')
        page = req.params.page_name + "_" + req.params.sub_page;

    fs.readFile('basic.html', (err, contents) => {
        if (err) {
            send_failure(res, helpers.http_code_for_error(err), err);
            return;
        }

        contents = contents.toString('utf8');

        // replace page name, and then dump to output.
        contents = contents.replace('{{PAGE_NAME}}', page);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(contents);
    });
};

// If we made it here, then we're logged in. redirect to admin home
exports.login = function (req, res) {
    res.redirect("/pages/admin/home");
    res.end();
};
