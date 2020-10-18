var express = require('express');
var router = express.Router();
var mySQLHelper = require('../helpers/mySQLHelper');
var cookieHelper = require('../helpers/cookieHelper');


//Handle login on POST
//Updates users.active = 1 in database and returns cookie with name "loggedInAs"
router.login = function(req, res, next) {
    var user = [
        req.body.username,
        req.body.password
    ];
    let baseSQL = 'SELECT * FROM users WHERE username = ? AND password = ?';

    mySQLHelper.makeQuery(baseSQL, user)
        .then((rows) => {
            let result = rows[0].username;
            console.log(rows);
            if(rows.length > 0) {
                console.log(result);
                baseSQL = 'UPDATE users SET active = 1 WHERE username = ?';
                mySQLHelper.makeQuery(baseSQL, result);
                req.session.username = result;
                res.cookie('loggedInAs', result);
                res.redirect('/');
            } else {
                console.log("User not found")
                res.redirect('/login');
            }

            
        })
        .catch((error) => {
            console.log(error);
        });
}

router.logout = function(req, res) {
    
    cookieHelper.getLoggedIn(req)
        .then((value) => {
            if(typeof value == "string") {
                console.log(value);

                let baseSQL = 'UPDATE users SET active = 0 WHERE username = ?';

                mySQLHelper.makeQuery(baseSQL, value)

                res.clearCookie('loggedInAs');
                res.cookie('loggedInAs', undefined, {'maxAge': 0});
                res.redirect('/');

            } else {
                console.log(value);
            }
        });
}
module.exports = router;

