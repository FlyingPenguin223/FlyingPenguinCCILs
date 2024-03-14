const params = new URLSearchParams(document.location.search);

let gifs = document.getElementById("gif");
let text = document.getElementById("text");
let file = params.get("lvl");

let img = document.createElement("img");
img.src=file
img.width=256;
img.height=256;
gifs.appendChild(img);

let filename = file.split("/");
filename=filename[filename.length-1];

let words=document.createElement("p");
fetch("descriptions/"+filename+".txt").then(Response => {
    if (!Response.ok) {
        words.innerHTML = "There is no description for this gif (or a server error occured).";
    } else {
        Response.text().then(text => {
            let formattedText = text
            formattedText = formattedText.replace(/\|/g,"\\n");
            words.innerHTML = formattedText;
        });
    }
});
text.appendChild(words);