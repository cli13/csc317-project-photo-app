//Might not need this file, remember to delete if so

var express = require('express');
var router = express.Router();
var expressFileUpload = require('express-fileupload');
var imageHelper = require('../helpers/imageHelper');
var cookieHelper = require('../helpers/cookieHelper');
var mySQLHelper = require('../helpers/mySQLHelper');


router.use(expressFileUpload({
    limits:{fileSize: 15 * 1024 * 1024},
    debug: true
}));

router.post('/post-image', function(req, res, next) {
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.files.image);
    console.log(req.session.username);
    let image = req.files.image;
    
    //Get total number of images in database, will name based off of image number within database
    imageHelper.getTotalNumberOfImages()
        .then((rows) => {
            let postNum = rows.length + 1;
            let newFileName = './public/images/' + image.name;
            console.log(newFileName);
            cookieHelper.getLoggedIn(req)
                .then((value) => {
                    console.log(value);
                    //Get user id to use for image post foreign key
                    let baseSQL = 'SELECT id FROM users WHERE username = ?';
                    mySQLHelper.makeQuery(baseSQL, value)
                        .then((rows) => {
                            console.log(rows[0].id);

                            image.mv(newFileName, (err) => {
                                if(err) {
                                    console.log(err);
                                    res.redirect('/post-image');
                                } else {
                                    res.redirect('/');
                                }
                            })    
                            //Need to update file name for MySQL storage or else photopath is wrong
                            newFileName = './images/' + image.name;

                            var imageInfo = [
                                req.body.title,
                                req.body.description,
                                rows[0].id,
                                newFileName
                            ]
                
                            console.log(imageInfo);
                
                            imageHelper.postImage(imageInfo);
                        })
                });

        });
});


router.get('/images', function(req, res,  next) {
    imageHelper.getRecentSixImages()
        .then((rows) => {
            res.send(rows);
        });
});




module.exports = router;