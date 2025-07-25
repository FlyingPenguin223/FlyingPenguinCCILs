//basically all of this code blatantly taken from (and learned from) the celeste classic gif database.

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
		for (let tag of searchTags) {
			return gif.tags.includes(tag) || tag === "all"
		}
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
		let img = document.createElement("a");
		img.href="description.html?lvl="+gif.url
		img.innerHTML='<img src="gifs/'+gif.url+'" title="Tags: '+gif.tags.join(", ")+'" width=256 height=256>'

		content.appendChild(img);
	}
});
