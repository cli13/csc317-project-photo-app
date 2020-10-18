var mysqlConnection = require('./mySQL');
var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);

var sessionStore = new mysqlStore({
    clearExpired: true,
    checkExpirationInterval: 600000,
    expiration: 900000,
    schema: {
        tableName: 'sessions',
        expires: 'expires',
        data: 'data'
    }
}, mysqlConnection);




module.exports = session;
module.exports.sessionStore = sessionStore;


