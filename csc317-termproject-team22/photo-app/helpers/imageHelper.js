var mySQLHelper = require('./mySQLHelper');
var imageHelper = {

};
//FOR IMAGE SEARCH USE 'LIKE' STATEMENTS IN MYSQL STATEMENTS
//EXTRA CREDIT: CREATE USER DASHBOARD

imageHelper.postImage = (arg) => {
    let baseSQL = 'INSERT INTO imageposts (title, description, fk_userid, active, photopath) VALUES (?, ?, ?, 1, ?)';
    mySQLHelper.makeQuery(baseSQL, arg);
};

//Gets six most recent images posted from MySQL database and returns rows
imageHelper.getRecentSixImages = (num) => {
    return new Promise((resolve, reject) => {
        let i = num * 6;
        let baseSQL = "SELECT imageposts.id,`title`, `description`, `photopath`, `username` FROM imageposts INNER JOIN users ON imageposts.fk_userid = users.id ORDER BY imageposts.id DESC LIMIT 6 OFFSET " + i.toString();
        console.log(baseSQL);
        mySQLHelper.makeQuery(baseSQL, null)
            .then(rows => {
                return resolve(rows);
            });
    });
};

//Returns all images so frontend can figure out how many available pages 
imageHelper.getTotalNumberOfImages = () => {
    return new Promise((resolve, reject) => {
        let baseSQL = "SELECT * FROM imageposts";
        console.log(baseSQL);
        mySQLHelper.makeQuery(baseSQL, '')
            .then((rows) => {
                return resolve(rows);
            })
    });
};

imageHelper.getName = () => {
    return new Promise((resolve, reject) => {
        //SELECT users.username FROM users INNER JOIN imageposts ON imageposts.fk_userid = users.id WHERE users.id=?
        let baseSQL = "SELECT imageposts.id,`title`, `description`, `photopath`, `username` FROM imageposts INNER JOIN users ON imageposts.fk_userid = users.id";
        console.log(baseSQL);
        mySQLHelper.makeQuery(baseSQL, '')
            .then((rows) => {
                return resolve(rows);
            })
    });
};

imageHelper.searchForSix = (arg, num) => {
    return new Promise((resolve, reject) => {
        let i = num * 6;

        let baseSQL = "SELECT imageposts.id, `title`, `description`, `photopath`, `username` FROM imageposts INNER JOIN users on imageposts.fk_userid = users.id WHERE imageposts.id REGEXP ? OR imageposts.description REGEXP ? OR imageposts.photopath REGEXP ? OR users.username REGEXP ? ORDER BY imageposts.id ASC LIMIT 6 OFFSET " + i.toString();
        console.log(baseSQL);

        mySQLHelper.makeQuery(baseSQL, arg) 
            .then((rows) => {
                return resolve(rows);
            });
        
    })
}

imageHelper.searchForAll = (arg) => {
    return new Promise((resolve, reject) => {
        let baseSQL = "SELECT imageposts.id, `title`, `description`, `photopath`, `username` FROM imageposts INNER JOIN users on imageposts.fk_userid = users.id WHERE imageposts.id REGEXP ? OR imageposts.description REGEXP ? OR imageposts.photopath REGEXP ? OR users.username REGEXP ? ORDER BY imageposts.id ASC";

        mySQLHelper.makeQuery(baseSQL, arg)
            .then((rows) => {
                return resolve(rows);
            })
    })
}

module.exports = imageHelper;