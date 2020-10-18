
//Start of functions
//Creates a image for page
function createImageTemplate(image) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let title = document.createElement('p');
    let user = document.createElement('p');
    let anchor = document.createElement('a');

    img.src = image.photopath;
    img.width = "200";
    img.height = "200";
    img.style.objectFit = "contain";

    anchor.setAttribute("href", "imagePage.html?id=" + image.id);
    anchor.appendChild(img);

    title.innerHTML = "<b>Image Title: </b>" + image.title;
    user.innerHTML = "<b>Posted by: </b>" + image.username;

    div.classList.add("images");
    div.appendChild(anchor);
    div.appendChild(title);
    div.appendChild(user);

    return div;
}


//Gets number of total images in database and returns number of possible pages
function getAvailablePagesAll() {
    var ajaxcall = new XMLHttpRequest();

    ajaxcall.open('GET', 'http://localhost:3000/totalimages', true);
    ajaxcall.onload = function() {
        console.log("Success... got pages");
        var res = JSON.parse(this.responseText);
        totalPages = (res.length / 6);
    }
    ajaxcall.onerror = function() {
        console.log("Error...");
    }
    ajaxcall.send()
}

//Gets all images that fulfill search requirements and returns number of possible pages
function getAvailablePagesSearch(values) {
    var ajaxcall = new XMLHttpRequest();

    ajaxcall.open('POST', 'http://localhost:3000/searchAll');
    ajaxcall.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajaxcall.onload = function () {
        console.log("Search for all success");

        var res = JSON.parse(this.responseText);
        totalPages = (res.length / 6);
    }

    ajaxcall.onerror = function () {
        console.log("Error getting all searched images");
    }

    ajaxcall.send("values=" + values);
}


//Gets 6 most recent images from all images
function getRecentImages(numOfPages) {
    var ajaxcall = new XMLHttpRequest();

    ajaxcall.open('POST', 'http://localhost:3000/images', true);
    ajaxcall.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajaxcall.onload = function() {
        console.log("Success...");
        var res = JSON.parse(this.responseText);
        
        populatePage(res);
    };

    ajaxcall.onerror = function() {
        console.log("Error...");
    };


    ajaxcall.send("numOfPages=" + numOfPages);
}

//Gets 6 most recent images that fulfill search requirements
function searchImages(args, numOfPages) {
    console.log(args);

    var ajaxcall = new XMLHttpRequest();

    ajaxcall.open('POST', 'http://localhost:3000/search', true);
    ajaxcall.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajaxcall.onload = function() {
        console.log("Search success...");

        var res = JSON.parse(this.responseText);

        populatePage(res);

    }

    ajaxcall.onerror = function() {
        console.log("Error while searching for images...");
    }

    ajaxcall.send("values=" + args + "&numOfPages=" + numOfPages);
}

//Fills search bar with what user searched after redirect
function fillSearchBar() {
    
    var url = document.URL.split('?');
    url = url[1];
    url = url.split('%20');
    
    values = url;

    let searched = "";

    values.forEach(word => {
        searched = searched + word + " ";
    });

    document.getElementsByName("search")[0].value = searched;

    return values;
}

//Add images to page
function populatePage(res) {
    var imageGrid = document.getElementsByClassName("image-grid")[0];
        var previousImage;
        imageGrid.innerHTML = "";
        if(res.length > 0) {
            imageGrid.appendChild(createImageTemplate(res[res.length-1]));
            var previousImage = imageGrid.children[0];

            for (var i = 0; i < res.length - 1; i++) {
                let imageTemplate = createImageTemplate(res[i]);
                previousImage.insertAdjacentElement("beforebegin", imageTemplate);
            }
            console.log("Populated images");
        } else {
            let p = document.createElement('p');
            p.innerHTML = "<b>No results found</b>";
            p.style.fontSize = "24px";

            imageGrid.appendChild(p);
        }
        
}

//Previous/Next page
function newPage(previous, next, numOfPages, totalPages, home, values) {
    if(numOfPages > 0) {
        previous.disabled = false;
        previous.style.backgroundColor = "#9147FF";
    } else {
        previous.disabled = true;
        previous.style.backgroundColor = "gray";
        console.log("No more previous pages");
    }

    if(numOfPages < totalPages - 1) {
        next.disabled = false;
        next.style.backgroundColor = "#9147FF";
    } else {
        next.disabled = true;
        next.style.backgroundColor = "gray";
        console.log("No more next pages");
    }

    if(home) {
        getRecentImages(numOfPages);
    } else {
        searchImages(values, numOfPages);
    }
}
// ------------------- End of functions



var numOfPages = 0;
var totalPages;

var homePage = false;
var searchValues;

var nextPictures = document.getElementsByClassName("more-images")[0];
var previousPictures = document.getElementsByClassName("less-images")[0];

//Disables previous page button
previousPictures.disabled = true;
previousPictures.style.backgroundColor = "gray"


window.onload = (ev) => {
    var url = document.URL.split('/');
    console.log(url);
    console.log("test");

    if(url[3] == "") {
        homePage = true;
        totalPages = getAvailablePagesAll();
        setTimeout(function() {
            console.log(totalPages);
            getRecentImages(0)
        }, 250);
    } else {
        console.log("This is not the home page");
        searchValues = fillSearchBar();
        totalPages = getAvailablePagesSearch(searchValues);
        setTimeout(function () {
            console.log(totalPages);
            searchImages(searchValues, 0);
        }, 250);        
    }
    
    if(totalPages < 1) {
        nextPictures.disabled = true;
        nextPictures.style.backgroundColor = "gray";
    }
}



nextPictures.addEventListener('click', function(ev) {
    numOfPages++;
    newPage(previousPictures, nextPictures, numOfPages, totalPages, homePage, searchValues);
});


previousPictures.addEventListener('click', function(ev) {
    numOfPages--;
    newPage(previousPictures, nextPictures, numOfPages, totalPages, homePage, searchValues);
})




