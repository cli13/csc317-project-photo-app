var mysql = require('mysql');

//databse credentials
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "csc317-termproject-team22",
    database: "csc317db"
    // debug: true
});



mysqlConnection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!");
        
    }
});

//simple query check to see if db is connected
mysqlConnection.query('SELECT * FROM users', function(error, rows, fields) {
    if(error) {
        console.log(error);
        console.log("Error in test query");
    } else {
        console.log("Successful test query");
    }
})


//test2
var test = {
    username: test
}
mysqlConnection.query('SELECT * FROM users WHERE username = ?', [test.username], function(error, rows, fields) {
    if(error) {
        console.log(error);
        console.log("Error in SELECT test query");
    } else if(rows.length) {
        console.log("Found something from SELECT test query");
    } else {
        console.log("Found nothing in SELECT test query, so successful");
    }
})

module.exports = mysqlConnection;
