window.addEventListener("load", () => {
	document.getElementById("leftButton" ).addEventListener("click", goLeft);
	document.getElementById("rightButton").addEventListener("click", goRight);
	
	document.body.addEventListener("keydown", e => {
		switch(e.key){
			case "ArrowRight": goRight(); break;
			case "ArrowLeft": goLeft(); break;
		}
	});

	createNewPage("prevL", getPath((PAGE_COUNT + currentPage - 2) % PAGE_COUNT));
	createNewPage("prevR", getPath((PAGE_COUNT + currentPage - 1) % PAGE_COUNT));
	createNewPage("curnL", getPath((PAGE_COUNT + currentPage) % PAGE_COUNT));
	createNewPage("curnR", getPath((PAGE_COUNT + currentPage + 1) % PAGE_COUNT));
	createNewPage("nextL", getPath((PAGE_COUNT + currentPage + 2) % PAGE_COUNT));
	createNewPage("nextR", getPath((PAGE_COUNT + currentPage + 3) % PAGE_COUNT));
})

const PAGE_COUNT = 358

/**
 * left page, for right one add 1
 */
let currentPage = -1;

function goLeft() {
	let prevL = document.getElementById("prevL");
	let nextL = document.getElementById("nextL");
	let prevR = document.getElementById("prevR");
	let nextR = document.getElementById("nextR");
	let curnL = document.getElementById("curnL");
	let curnR = document.getElementById("curnR");

	currentPage = (PAGE_COUNT + currentPage - 2) % PAGE_COUNT;

	prevL.id = "curnL";
	prevR.id = "curnR";
	curnL.id = "nextL";
	curnR.id = "nextR";
	nextL.remove();
	nextR.remove();
	createNewPage("prevL", getPath(currentPage - 2), false);
	createNewPage("prevR", getPath(currentPage - 1), false);
}

function goRight() {
	let prevL = document.getElementById("prevL");
	let nextL = document.getElementById("nextL");
	let prevR = document.getElementById("prevR");
	let nextR = document.getElementById("nextR");
	let curnL = document.getElementById("curnL");
	let curnR = document.getElementById("curnR");

	currentPage = (PAGE_COUNT + currentPage + 2) % PAGE_COUNT;

	nextL.id = "curnL";
	nextR.id = "curnR";
	curnL.id = "prevL";
	curnR.id = "prevR";
	prevL.remove();
	prevR.remove();
	createNewPage("nextR", getPath(currentPage + 3), false);
	createNewPage("nextL", getPath(currentPage + 2), false);
}

function getPath(img){
	return `catalog/page (${img}).webp`;
}

function createNewPage(id, src, now = true){
	let root = document.getElementById("root");
	let element = document.createElement("img");

	element.id = id;
	element.classList.add("page");
	element.setAttribute("alt", src);
	
	if(now)
		element.setAttribute("src", src);
	else
		setTimeout(() => { element.setAttribute("src", src) }, 2000);

	root.appendChild(element);
}
