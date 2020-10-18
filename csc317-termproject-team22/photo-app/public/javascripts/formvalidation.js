console.log("js loaded");


//Start of functions

function checkEmpty(idName1, idName2) {
    if (idName1.value.length === 0) {
        console.log("Textbox is empty");
        idName2.innerHTML = "* Required";
        return false;
    } else {
        idName2.innerHTML = "<br />";
        return true;
    }
}


function checkLength(idName1, idName2, num) {
    let counter = 0;
    let inputType;

    if (num === 3) {
        inputType = "Username";
    } else {
        inputType = "Password";
    }

    for (var i = 0; i < idName1.value.length; i++) {
        if (idName1.value[i].match(/[a-z0-9]/i)) {
            counter++;
        }
    }

    if (counter < num) {
        idName2.innerHTML = "* " + inputType + " needs to be " + num + " or more alphanumeric characters";
        return false;
    } else {
        idName2.innerHTML = "<br />";
        return true;
    }
}

function checkPassword(idName1, idName2) {
    let special = false;
    let upper = false;
    let number = false;

    for (var i = 0; i < idName1.value.length; i++) {
        if (idName1.value[i].match(/[*!@#$^&*-]/)) {
            special = true;
        }

        if (idName1.value[i].match(/[0-9]/)) {
            number = true;
        }

        if (idName1.value[i].match(/[A-Z]/)) {
            upper = true;
        }
    }

    if (special && upper && number) {
        idName2.innerHTML = "<br />";
        return true;
    } else {
        idName2.innerHTML = "* Password must contain at least 1 upper case letter, 1 number, and 1 special character";
        return false;
    }
}

function comparePassword(idName1, idName2, compareTo) {
    let equal = true;

    if (idName1.value.length !== compareTo.value.length) {
        equal = false;
        console.log("Length not equal");
        console.log(idName1.value.length);
        console.log(compareTo.value.length);
    } else {
        for (var i = 0; i < compareTo.value.length; i++) {
            if (!(idName1.value[i] === compareTo.value[i])) {
                equal = false;
                console.log(idName1.value[i] + compareTo.value[i]);
                break;
            }
        }
    }
    if (equal) {
        idName2.innerHTML = "<br />";
        return true;
    } else {
        idName2.innerHTML = "* Both passwords must be the same";
        return false;
    }
}

function checkEmail(idName1, idName2) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(idName1.value)) {
        idName2.innerHTML = "<br />";
        console.log("Email is valid");
        return true;
    } else {
        idName2.innerHTML = "* Must be a valid email address";
        return false;
    }
}

function checkImage(idName1, idName2) {
    let allowedImageFiles = /(\.jpg|\.bmp|\.png|\.gif)$/i;
    if (idName1.files.length === 0) {
        idName2.innerHTML = "* Required";
        return false;
    } else if (!(allowedImageFiles.exec(image.value))) {
        console.log("Unsupported file type");
        idName2.innerHTML = "* File must have extension .jpg, .bmp, .png, .gif";
        return false;
    } else {
        var reader = new FileReader();

        reader.onload = ((ev) => {
            document.getElementById("custom-file").style.backgroundImage = "url('" + ev.target.result + "')";
        });
        reader.readAsDataURL(idName1.files[0]);
        return true;
    }
}

function checkCheckbox(idName) {
    let checked = false;

    if (idName.checked) {
        console.log("checked");
        return true;
    } else {
        return false;
    }
}

function enableSubmit(checkbox1, checkbox2) {
    if (checkbox1 && checkbox2) {
        submit.disabled = false;
        submit.style.backgroundColor = "#9147FF";
        return true;
    } else {
        submit.disabled = true;
        submit.style.backgroundColor = "gray";
    }

    return false;
}
//End of Functions


var login = true;
var postImage = true;
var registration = true;


try {
    var username = document.getElementsByClassName("username")[0];
    var usernameRequired = document.getElementById("username-required");


    username.addEventListener('focusout', (ev) => {
        if (checkEmpty(username, usernameRequired)) {
            checkLength(username, usernameRequired, 3);
        }
    });

    postImage = false;
} catch (error) {
    console.log("Username element does not exist");
}

try {
    var confirmPassword = document.getElementById("confirm-password");
    var confirmPasswordRequired = document.getElementById("confirm-required");
    var compareToPassword = document.getElementById("registration-password");

    confirmPassword.addEventListener('focusout', (ev) => {
        if (checkEmpty(confirmPassword, confirmPasswordRequired)) {
            comparePassword(confirmPassword, confirmPasswordRequired, compareToPassword);
        }

    });

    login = false;
    postImage = false;
} catch (error) {
    console.log("Confirm password element does not exist");
}

try {
    var email = document.getElementsByClassName("email")[0];
    var emailRequired = document.getElementById("email-required");

    email.addEventListener('focusout', (ev) => {
        if (checkEmpty(email, emailRequired)) {
            checkEmail(email, emailRequired);
        }

    });

    login = false;
    postImage = false;
} catch (error) {
    console.log("Email element does not exist");
}

try {
    var password = document.getElementsByClassName("password")[0];
    var passwordRequired = document.getElementById("password-required");

    password.addEventListener('focusout', (ev) => {
        if (checkEmpty(password, passwordRequired)) {
            if (checkLength(password, passwordRequired, 8) && !login) {
                checkPassword(password, passwordRequired);
            }
        }
    });

    postImage = false;
} catch (error) {
    console.log("Password element does not exist");
}

try {
    var imageTitle = document.getElementsByName("title")[0];
    var imageTitleRequired = document.getElementById("title-required");

    imageTitle.addEventListener('focusout', (ev) => {
        checkEmpty(imageTitle, imageTitleRequired);
    });

    login = false;
    registration = false;
} catch (error) {
    console.log("Image title element does not exist");
}

try {
    var imageDescription = document.getElementsByName("description")[0];
    var imageDescriptionRequired = document.getElementById("description-required");

    imageDescription.addEventListener('focusout', (ev) => {
        checkEmpty(imageDescription, imageDescriptionRequired);
    });

    login = false;
    registration = false;
} catch (error) {
    console.log("Image description element does not exist");
}

try {
    var image = document.getElementsByName("image")[0];
    var imageRequired = document.getElementById("image-required");

    image.oninput = ((ev) => {
        console.log(ev);
        checkImage(image, imageRequired);
    });

    login = false;
    registration = false;
} catch (error) {
    console.log("Image input element does not exist");
}

var submit = document.getElementsByClassName("submit")[0];

try {
    var ageCheckbox = document.getElementById("13years");
    var tosCheckbox = document.getElementById("TOS");

    var ageChecked = false;
    var tosChecked = false;

    submit.disabled = true;
    submit.style.backgroundColor = "gray";

    ageCheckbox.addEventListener('change', (ev) => {
        ageChecked = checkCheckbox(ageCheckbox);
        enableSubmit(ageChecked, tosChecked);
    });

    tosCheckbox.addEventListener('change', (ev) => {
        tosChecked = checkCheckbox(tosCheckbox);
        enableSubmit(ageChecked, tosChecked);
    });


} catch (error) {
    submit.disabled = false;
    submit.style.backgroundColor = "#9147FF";
    console.log("Registration checkbox elements do not exist");
}

try {
    var acceptableCheckbox = document.getElementById("acceptable-checkbox");

    submit.disabled = true;
    submit.style.backgroundColor = "gray";

    acceptableCheckbox.addEventListener('change', (ev) => {
        if (checkCheckbox(acceptableCheckbox)) {
            submit.disabled = false;
            submit.style.backgroundColor = "#9147FF";
        }
    });
} catch (error) {
    submit.disabled = false;
    submit.style.backgroundColor = "#9147FF";
    console.log("Post image checkbox element does not exist");
}


submit.onclick = ((ev) => {

    if (login) {
        if (checkEmpty(username, usernameRequired) && checkLength(username, usernameRequired, 3) && checkEmpty(password, passwordRequired) && checkLength(password, passwordRequired, 8)) {
            var logInfo = {
                username: username.value,
                password: password.value
            };

            logInfo = JSON.stringify(logInfo);
            console.log("Login form submitted");
            console.log(logInfo);
            return true;
        } else {
            ev.preventDefault();
        }
    } else if (postImage) {
        if (checkEmpty(imageTitle, imageTitleRequired) && checkEmpty(imageDescription, imageDescriptionRequired) && checkImage(image, imageRequired)) {
            var imageInfo = {
                title: imageTitle.value,
                description: imageDescription.value,
                image: image.value,
                usePolicy: document.getElementsByName("image-checkbox")[0].value
            };

            console.log("Image posted");
            imageInfo = JSON.stringify(imageInfo);
            console.log(imageInfo);
        } else {
            ev.preventDefault();
        }
    } else if (registration) {
        if (checkEmpty(email, emailRequired) && checkEmpty(password, passwordRequired) && checkEmpty(username, usernameRequired) && checkLength(password, passwordRequired, 8) && checkLength(username, usernameRequired, 3) && comparePassword(confirmPassword, confirmPasswordRequired, compareToPassword) && checkEmail(email, emailRequired)) {
            var regInfo = {
                username: username.value,
                password: password.value,
                email: email.value,
                age: document.getElementById("13years").value,
                TOS: document.getElementById("TOS").value
            };

            console.log("Account Registered");
            regInfo = JSON.stringify(regInfo);
            // console.log(regInfo);
        } else {
            ev.preventDefault();
        }
    }
});

