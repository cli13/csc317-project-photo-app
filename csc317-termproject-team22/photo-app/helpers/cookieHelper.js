var cookieHelper = {

};

cookieHelper.getLoggedIn = (req) => {
    return new Promise((resolve, reject) => {
        let cookie = req.headers.cookie.split(/[;=]/);

        let value = " loggedInAs";

        if (cookie.includes(value)) {
            console.log("Has loggedInAs cookie");
            value = cookie[cookie.indexOf(value) + 1];
            resolve(value);
        } else {
            value = false;
            console.log("Cant find loggedInAs cookie");
            resolve(value);
        }
    })

}

module.exports = cookieHelper;