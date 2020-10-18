console.log("Search Bar js loaded");

var searchBar = document.getElementsByName("search")[0];
var searchSubmit = document.getElementById("search-submit");

searchBar.oninput = (ev) => {
    searchSubmit.href = '/search.html?' + searchBar.value;
    console.log(searchSubmit.href);
}

searchBar.onkeypress = (ev) => {
    if(ev.keyCode == 13) {
        console.log("Enter key pressed");
        searchSubmit.click();
    }
}