function populatePage(data) {
    let title = document.getElementById("title-imagePage");
    let desc = document.getElementById("Description");
    let img = document.getElementById("imageProp-imagePage");

    console.log(data[2]);
    title.innerHTML = data[0];
    desc.innerHTML = data[1] + "<br>Posted by: " + data[3];

    img.src = data[2];
};

function createComment(data) {
    let div = document.createElement('div');
    let comment = document.createElement('p');

    comment.innerHTML = "<b>" + data.username + ": </b> " + data.comment;

    div.appendChild(comment);

    return div;
}


function populateComments(data) {
    let commentSection = document.getElementsByClassName("CommentDB")[0];
    commentSection.innerHTML = "";

    data.forEach((comment) => {
        commentSection.appendChild(createComment(comment));
    });


}


window.onload = (ev) => {

    getImage(getImageId());
    getComments(getImageId(), 0);
};

// On comment button click, use ajaxcall GET to get comments
var commentSubmit = document.getElementsByClassName("button")[0];
var comment = document.getElementsByName("comment")[0];

commentSubmit.onclick = (ev) => {
    ev.preventDefault();

    postComment();



    //Waits for comment to be posted then calls getComment ajax call
    setTimeout(function() {
        comment.value = "";
        getComments(getImageId(), 0);
    }, 500);
}


function getImageId() {
    var str = window.location.href;
    var arr = str.split("=");
    return arr[1];
}


function getImage(index) {
    var ajaxcall = new XMLHttpRequest();
    let array = [];
    ajaxcall.open('GET', 'http://localhost:3000/nameTest', true);

    console.log(JSON.stringify(this.responseText));

    ajaxcall.onload = function() {
        console.log("Success");
        var res = JSON.parse(this.responseText);
        for (let i = 0; i < res.length; i++) {
            if (index == res[i].id) {
                array[0] = res[i].title;
                array[1] = res[i].description;
                array[2] = res[i].photopath;
                array[3] = res[i].username;
            }
        }
        console.log(array);
        populatePage(array);
    };
    ajaxcall.onerror = function() {
        console.log("Error");
    }
    ajaxcall.send();
}

function postComment() {
    var ajaxcall = new XMLHttpRequest();

    ajaxcall.open('POST', 'http://localhost:3000/postComment', true);
    ajaxcall.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxcall.onload = function() {
        console.log("Sucess, posted comment");

        var res = JSON.parse(this.responseText);

        console.log(res.affectedRows);
    }

    ajaxcall.onerror = function() {
        console.log("Error while posting comments");

    }

    var imageId = document.URL.split("=");
    imageId = imageId[1]
    console.log(imageId);
    let comment = document.getElementsByName("comment")[0].value;
    console.log(comment);

    ajaxcall.send("imageId=" + imageId + "&comment=" + comment);

}

function getComments(index, numOfPages) {
    var ajaxcall = new XMLHttpRequest();

    ajaxcall.open('POST', 'http://localhost:3000/getComments', true);
    ajaxcall.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxcall.onload = function() {
        console.log("Getting comments...");

        var res = JSON.parse(this.responseText);
        console.log(res);
        populateComments(res);
    }

    ajaxcall.onerror = function() {
        console.log("Error while getting comments");
    }

    ajaxcall.send("numOfPages=" + numOfPages + "&index=" + index);
}