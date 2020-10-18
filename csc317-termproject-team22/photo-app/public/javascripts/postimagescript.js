console.log("js loaded");

//When custom anchor image tag is clicked, trigger file input click
var fileInput = document.getElementById("custom-file");

fileInput.onclick = ((ev) => {
    clickFileInput();
})


//Get image input and show preview

function checkImage() {
        var reader = new FileReader();
        
        reader.onload = ((ev) => {
            document.getElementById("custom-file").style.backgroundImage = "url('" + ev.target.result + "')";
        })
        reader.readAsDataURL(imageInput.files[0]);
        return true;
}

var imageInput = document.getElementsByName("image")[0];

imageInput.oninput = ((ev) => {
    checkImage();
})