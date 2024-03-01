let database;
let xhr = new XMLHttpRequest();
xhr.open("GET", "database.json");
xhr.send();
xhr.onload = () => {
    database = JSON.parse(xhr.responseText);
}

let content = document.getElementById('gifs');

for (let gif of database) {
    let img = document.createElement("img");
    img.src = gif.url;
    content.appendChild(img);
}
