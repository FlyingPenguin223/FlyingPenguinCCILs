//all of this code blatantly taken from the celeste classic gif database.

let content = document.getElementById('gifs');
let database;
let xhr = new XMLHttpRequest();
xhr.open("GET", "database.json");
xhr.send();
xhr.onload = () => {
    database = JSON.parse(xhr.responseText);
}

function getGifs(searchTags) {
    return database.filter(gif => {
        for (let tag of searchTags)
            if (!gif.tags.includes(tag))
                return false;
        return true;
    });
}

let textbox = document.getElementById('search');
let submit = document.getElementById('submit');

textbox.addEventListener("keyup", (e) => {
    if (e.code === "Enter")
      submit.click();
});

submit.addEventListener('click', () => {
    let searchTags = new Set(textbox.value.split(/\s+/).filter(x => x != ''));
    if (searchTags.size == 0)
      return;
  
    let content = document.getElementById('gifs');
    while (content.firstChild) {
     content.firstChild.remove();
    }
  
    let gifResults = getGifs(searchTags);
    for (let gif of gifResults) {
      let img = document.createElement("img");
      img.src = gif.url;
      img.title = 'Tags: ' + gif.tags.join(", ");
      img.width = 256;
      img.height = 256;
  
      content.appendChild(img);
    }
});