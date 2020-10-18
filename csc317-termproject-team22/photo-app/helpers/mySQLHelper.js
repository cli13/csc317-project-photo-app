//PUT ALL THE MYSQL CODE IN HERE AND EXPORT IT TO OTHER FILES
var mysqlConnection = require('../controllers/mySQL');

mysqlConnection.makeQuery = (sql, args) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, args, function(err, rows) {
            if (err) {
                return reject(err);
            } else {
                return resolve(rows);
            }
        })
    })
};

mysqlConnection.getData = (sql, args) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, args, function(err, results) {
            if (err) {
                console.log(err);
                return reject(err);
            } else if (results.length > 0) {
                console.log(results);
                return resolve(false);
            } else {
                return resolve(true);
            }
        })
    })
};

module.exports = mysqlConnection;




// mysql.getUser = function(req, res, next) {
//     var user = [
//         [req.body.username, req.body.password]
//     ];
//     console.log(user);

//     var baseSQL = 'SELECT * FROM users WHERE username = ? AND password = ?';

//     mysqlConnection.query(baseSQL, [req.body.username, req.body.password], function (error, rows) {
//         if(error) {
//             console.log(error);
//         } else if(rows.length > 0) {
//             // res.cookie('username', req.body.username);
//             console.log("Found user");
//             mysql.activateUser(req, res, next);
//             return true;         
//         } else {
//             console.log("Got in else");
//             return false;
//         }

//         // if(authenticated) {
//         //     res.send("Logged in ");
//         // } else {
//         //     console.log(authenticated);
//         //     res.send("User not found");
//         // }
//     });
// };