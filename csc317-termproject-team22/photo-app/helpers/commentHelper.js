var mySQLHelper = require('./mySQLHelper');
var cookieHelper = require('./cookieHelper');

var commentHelper = {

};

commentHelper.postComment = (req, res, next) => {
    //First get user who is logged in
    cookieHelper.getLoggedIn(req)
        .then((value) => {
            console.log(value);

            //Get user id
            let baseSQL = "SELECT id FROM users WHERE username = ?";
            mySQLHelper.makeQuery(baseSQL, value)
                .then((rows) => {
                    var commentInfo = [
                        req.body.comment,
                        rows[0].id,
                        req.body.imageId
                    ]

                    baseSQL = "INSERT INTO comments (comment, fk_userid, fk_postid) VALUES (?, ?, ?)"
                    
                    mySQLHelper.makeQuery(baseSQL, commentInfo)
                        .then((rows) => {
                            res.send(rows);
                        })
                });
        })
};


commentHelper.getRecentSixComments = (req) => {
    return new Promise((resolve, reject) => {
        let i = req.body.numOfPages * 6;

        let baseSQL = "SELECT `comment`, users.username FROM comments INNER JOIN imageposts ON comments.fk_postid = imageposts.id INNER JOIN users users ON comments.fk_userid = users.id WHERE imageposts.id = ? ORDER BY comments.id DESC";
        // LIMIT 6 OFFSET " + i.toString()
        console.log(baseSQL);
        console.log("Image Post ID: " + req.body.index)
        mySQLHelper.makeQuery(baseSQL, req.body.index)
            .then((rows) => {
                return resolve(rows);
            })
    });
}

module.exports = commentHelper;