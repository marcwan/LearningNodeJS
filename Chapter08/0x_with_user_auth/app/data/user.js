
var async = require('async'),
    bcrypt = require('bcrypt'),
    db = require("./db.js"),
    uuid = require('node-uuid'),
    backhelp = require("./backend_helpers.js");


exports.version = "0.1.0";

exports.user_by_uuid = function (uuid, callback) {
    if (!uuid)
        callback(backhelp.missing_data("uuid"));
    else
        user_by_field("user_uuid", uuid, callback);
};

exports.user_by_display_name = function (dn, callback) {
    if (!dn)
        callback(backhelp.missing_data("display_name"));
    else
        user_by_field("display_name", dn, callback);
}

exports.user_by_email_address = function (email, callback) {
    if (!email)
        callback(backhelp.missing_data("email"));
    else
        user_by_field("email_address", email, callback);
};


exports.register = function (email, display_name, password, callback) {
    async.waterfall([
        // validate ze params
        function (cb) {
            if (!email || email.indexOf("@") == -1)
                cb(backhelp.missing_data("email"));
            else if (!display_name)
                cb(backhelp.missing_data("display_name"));
            else if (!password)
                cb(backhelp.missing_data("password"));
            else
                // generate a password hash
                bcrypt.hash(password, 10, cb);
        },

        // create the album in mongo.
        function (hash, cb) {
            var userid = uuid();
            // email must be unique, so use it as id
            var write = {
                _id: email_address,
                userid: userid,
                email_address: email,
                display_name: display_name,
                password: hash,
                first_seen_date: now_in_s(),
                last_modified_date: now_in_s(),
                deleted: false
            };
            db.users.insert(write, { w: 1, safe: true }, cb);
        },

        // fetch and return the new user.
        function (results, cb) {
            cb(null, results[0]);
        }
    ],
    function (err, user_data) {
        if (err) {
            if (err instanceof Error && err.code == 11000) 
                callback(backhelp.user_already_registered());
            else
                callback (err);
        } else {
            callback(null, user_data);
        }
    });
};



function user_by_field (field, value, callback) {
    var o = {};
    o[field] = value;

    db.albums.find( o ).toArray(function (err, results) {
        if (err) {
            callback(err);
            return;
        }
        if (results.length == 0) {
            callback(null, null);
        } else if (results.length == 1) {
            callback(null, results[0]);
        } else {
            console.error("More than one user matching field: " + value);
            console.error(results);
            callback(backutils.db_error());
        }
    });
}


function now_in_s() {
    return Math.round((new Date()).getTime() / 1000);
}

