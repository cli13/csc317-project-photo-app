var mySQLHelper = require('./mySQLHelper');
var regHelper = {

};

regHelper.checkUsername = (arg) => {
    return new Promise((resolve, reject) => {
        console.log(arg);
        console.log(arg[0]);
        if(arg[0] == undefined) {
            console.log("No username given");
            return false;
        } else {
            console.log("Username given, checking");
            let baseSQL = 'SELECT * FROM users WHERE username = ?';
            let result = false;
            mySQLHelper.getData(baseSQL, arg[0])
                .then((rows) => {
                    if(!rows) {
                        console.log("Username taken");
                        return resolve(result);
                    } else {
                        console.log(rows);
                        console.log("Username valid");
                        result = true;
                        return resolve(result);
                    }
            });
        }

    })
}

regHelper.checkEmail = (arg) => {
    return new Promise((resolve, reject) => {
        
        console.log(arg[1]);
        if(arg[1] == undefined) {
            console.log("No email given");
            return false;
        } else {
            console.log("Email given, checking");
            let baseSQL = 'SELECT * FROM users WHERE email = ?';
            let result = false;
            mySQLHelper.getData(baseSQL, arg[1])
                .then((rows) => {
                    if(!rows) {
                        console.log("Email taken");
                        return resolve(result);
                    } else {
                        console.log("Email valid");
                        result = true;
                        return resolve(result);
                    }
            });
        }

    })
}

regHelper.createUser = (arg) => {
    let baseSQL = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    mySQLHelper.makeQuery(baseSQL, arg);
}

module.exports = regHelper;