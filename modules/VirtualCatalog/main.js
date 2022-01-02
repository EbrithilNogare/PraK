window.addEventListener("load", () => {
	document.getElementById("leftButton" ).addEventListener("click", goLeft);
	document.getElementById("rightButton").addEventListener("click", goRight);
	
	document.body.addEventListener("keydown", e => {
		switch(e.key){
			case "ArrowRight": goRight(); break;
			case "ArrowLeft": goLeft(); break;
		}
	});

	createNewPage("prevL", PAGE_COUNT + currentPage - 2 % PAGE_COUNT, true);
	createNewPage("prevR", PAGE_COUNT + currentPage - 1 % PAGE_COUNT, true);
	createNewPage("curnL", PAGE_COUNT + currentPage + 0 % PAGE_COUNT, true);
	createNewPage("curnR", PAGE_COUNT + currentPage + 1 % PAGE_COUNT, true);
	createNewPage("nextL", PAGE_COUNT + currentPage + 2 % PAGE_COUNT, true);
	createNewPage("nextR", PAGE_COUNT + currentPage + 3 % PAGE_COUNT, true);
})

const PAGE_COUNT = 358

/**
 * left page, for right one add 1
 */
let currentPage = -1;
let windowObjectReference

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
	createNewPage("prevL", currentPage - 2, false);
	createNewPage("prevR", currentPage - 1, false);
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
	createNewPage("nextR", currentPage + 3, false);
	createNewPage("nextL", currentPage + 2, false);
}

function getPath(img, thumbnail = true){
	img = (PAGE_COUNT + img) % PAGE_COUNT;
	return `catalog/${thumbnail ? "thumbnails/" : ""}page (${img}).webp`;
}

function createNewPage(id, img, now){
	let root = document.getElementById("root");
	let element = document.createElement("img");

	element.id = id;
	element.classList.add("page");
	element.setAttribute("alt", img);

	element.addEventListener("click", () => {
		windowObjectReference = window.open(
			getPath(img, false),
			`Virtuální katalog str. ${img}`,
			"width="+screen.availWidth+", height="+screen.availHeight
		)
		windowObjectReference.moveTo(0,0)
	})
	
	if(now)
		element.setAttribute("src", getPath(img, true));
	else
		setTimeout(() => { element.setAttribute("src", getPath(img, true)) }, 2000);

	root.appendChild(element);
}
