var mysql = require('mysql'),
    local = require("../local.config.json");

exports.init = function () {
    conn_props = local.config.db_config;
    exports.dbpool = mysql.createPool({
        connectionLimit: conn_props.pooled_connections,
        host:            conn_props.host,
        user:            conn_props.user,
        password:        conn_props.password,
        database:        conn_props.database
    });
};

exports.dbpool = null;
