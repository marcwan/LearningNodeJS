var helpers = require('./helpers.js'),
    user_data = require("../data/user.js"),
    async = require('async'),
    bcrypt = require('bcrypt'),
    fs = require('fs');

exports.version = "0.1.0";


function User (user_data) {
    this.uuid = user_data["user_uuid"];
    this.email_address = user_data["email_address"];
    this.display_name = user_data["display_name"];
    this.password = user_data["password"];
    this.first_seen_date = user_data["first_seen_date"];
    this.last_modified_date = user_data["last_modified_date"];
    this.deleted = user_data["deleted"];
}

User.prototype.uuid = null;
User.prototype.email_address = null;
User.prototype.display_name = null;
User.prototype.password = null;
User.prototype.first_seen_date = null;
User.prototype.last_modified_date = null;
User.prototype.deleted = false;
User.prototype.check_password = function (pw, callback) {
    bcrypt.compare(pw, this.password, callback);
};
User.prototype.response_obj = function () {
    return {
        uuid: this.uuid,
        email_address: this.email_address,
        display_name: this.display_name,
        first_seen_date: this.first_seen_date,
        last_modified_date: this.last_modified_date
    };
};



exports.logged_in = function (req, res) {
    var li = (req.session && req.session.logged_in_email_address);
    helpers.send_success(res, { logged_in: li });
};


exports.register = function (req, res) {
    async.waterfall([
        function (cb) {
            var em = req.body.email_address;
            if (!em || em.indexOf("@") == -1)
                cb(helpers.invalid_email_address());
            else if (!req.body.display_name) 
                cb(helpers.missing_data("display_name"));
            else if (!req.body.password)
                cb(helpers.missing_data("password"));
            else
                cb(null);
        },

        // register da user.
        function (cb) {
            user_data.register(
                req.body.email_address,
                req.body.display_name,
                req.body.password,
                cb);
        },

        // mark user as logged in
        function (user_data, cb) {
            req.session.logged_in = true;
            req.session.logged_in_email_address = req.body.email_address;
            req.session.logged_in_date = new Date();
            cb(null, user_data);
        }

    ],
    function (err, user_data) {
        if (err) {
            helpers.send_failure(res, helpers.http_code_for_error(err), err);
        } else {
            var u = new User(user_data);
            helpers.send_success(res, {user: u.response_obj() });
        }
    });
};


exports.login = function (req, res) {

    async.waterfall([
        function (cb) {
            var em = req.body.email_address
            if (!em || em.indexOf('@') == -1)
                cb(helpers.invalid_email_address());
            else if (req.session && req.session.logged_in_email_address
                     == em.toLowerCase())
                cb(helpers.error("already_logged_in", ""));
            else if (!req.body.password)
                cb(helpers.missing_data("password"));
            else
                cb(null);
        },

        // first get the user by the email address.
        function (cb) {
            user_data.user_by_email(req.body.email_address, cb);
        },

        // check the password
        function (user_data, cb) {
            var u = new User(user_data);
            u.check_password(req.body.password, cb);
        },

        function (auth_ok, cb) {
            if (!auth_ok) {
                cb(helpers.auth_failed());
                return;
            }

            req.session.logged_in = true;
            req.session.logged_in_email_address = req.body.email_address;
            req.session.logged_in_date = new Date();
            cb(null);
        }
    ],
    function (err, results) {
        if (!err || err.message == "already_logged_in") {
            helpers.send_success(res, { logged_in: true });
        } else {
            helpers.send_failure(res, helpers.http_code_for_error(err), err);
        }
    });
};

