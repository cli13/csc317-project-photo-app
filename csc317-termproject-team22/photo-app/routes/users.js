var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login-controller');
var registrationController = require('../controllers/registration-controller');

router.post('/login', function(req, res, next) {
    console.log(req.body.username);
    loginController.login(req, res, next);
});

router.post('/register', function(req, res, next) {
    console.log(req.body);
    console.log(registrationController);
    registrationController.register(req, res, next);
});

router.post('/logout', function(req, res, next) {
    console.log("Log out");
    loginController.logout(req, res, next);

});

module.exports = router;