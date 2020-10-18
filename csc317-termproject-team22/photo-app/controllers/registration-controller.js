var express = require('express');
var router = express.Router();
var registrationHelper = require('../helpers/registrationHelper');



router.register = function(req, res, next) {
    var user = [
        req.body.username,
        req.body.email,
        req.body.password,
        1                //Set active to 1
    ]
    console.log(registrationHelper);

    registrationHelper.checkUsername(user)
        .then((result) => {
            if(result) {
                registrationHelper.checkEmail(user)
                    .then((result) => {
                        if(result) {
                            console.log("Can register");
                            registrationHelper.createUser(user);
                            res.cookie('loggedInAs', user[0]);
                            res.redirect('/');
                        } else {
                            console.log("Something went wrong");
                        }
                    })
            } else {
                console.log("NOT WORKING");
            }
        })
}

module.exports = router;