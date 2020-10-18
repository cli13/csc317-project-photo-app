console.log("js loaded");

function openNav(idName1, idName2, onHome) {
    idName1.style.width = "200px";
    if (onHome) {
        idName2.style.transform = "translate(15%, 75px)";
    } else {
        idName2.style.transform = "translate(20%, 0px)";
    }

    // idName2.style.borderColor = '#68687B';
}

function closeNav(idName1, idName2, onHome) {
    idName1.style.width = "0%";
    if (onHome) {
        idName2.style.transform = "translate(75px, 75px)";
    } else {
        idName2.style.transform = "translate(0%, 0px)";
    }
    // idName2.style.borderColor = "white";
}

function clickFileInput() {
    document.getElementsByName("image")[0].click();
}

//Open Side Nav Bar on click
var navButton = document.getElementsByClassName("open-nav")[0];

var homePage = true;
var content = document.getElementsByClassName("image-grid")[0];

if (content == undefined) {
    homePage = false;
    console.log("On Post image page");
    content = document.getElementsByClassName("postform")[0];
    // console.log(content);
}

if (content == undefined) {
    homePage = false;
    console.log("On image page");
    content = document.getElementsByClassName("grid-container-imagePage")[0];
    // console.log(content);
}

navButton.onclick = ((ev) => {
    console.log(content);
    // console.log("navButton clicked");
    let sidebar = document.getElementsByClassName("sidebar")[0];

    if (sidebar.clientWidth == 0) {
        // console.log(sidebar.clientWidth);
        openNav(sidebar, content, homePage);
    } else {
        // console.log(sidebar.clientWidth);
        closeNav(sidebar, content, homePage);
    }
})

//--------- end of sidebar





function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


var value = readCookie('loggedInAs');
if (value === null) {
    value = "Guest";
    document.getElementById('displayLogin').style.display = "block";
    document.getElementById('displayContent').style.display = "none";

    //Specifically for view image page only
    try {
        let commentSubmit = document.getElementById("submit-comment");
        let commentArea = document.getElementsByName("comment")[0];

        commentSubmit.disabled = true;
        commentSubmit.style.backgroundColor = "gray";
        commentSubmit.style.cursor = "default";

        commentArea.disabled = true;
        commentArea.placeholder = "Must be logged in to comment";
    } catch {
        console.log("This isn't the view image page");
    }

} else {
    document.getElementById('displayLogin').style.display = "none";
    document.getElementById('displayContent').style.display = "block";

    try {
        let commentSubmit = document.getElementById("submit-comment");
        let commentArea = document.getElementsByName("comment")[0];

        commentSubmit.disabled = false;
        commentSubmit.style.backgroundColor = "#9147FF";
        commentSubmit.style.cursor = "pointer";

        commentArea.disabled = false;
        commentArea.placeholder = "Write a comment";
    } catch {
        console.log("This isn't the view image page");
    }
}
document.getElementById('displayName').innerHTML = "Hello, " + value;