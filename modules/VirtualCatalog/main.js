window.addEventListener("load", () => {
	document.getElementById("leftButton" ).addEventListener("click", goLeft);
	document.getElementById("rightButton").addEventListener("click", goRight);

	createNewPage("prevL", getPath(currentPage-2));
	createNewPage("prevR", getPath(currentPage-1));
	createNewPage("curnL", getPath(currentPage));
	createNewPage("curnR", getPath(currentPage+1));
	createNewPage("nextL", getPath(currentPage+2));
	createNewPage("nextR", getPath(currentPage+3));
})

/**
 * left page, for right one add 1
 */
let currentPage = 103;

function goLeft() {
	let prevL = document.getElementById("prevL");
	let nextL = document.getElementById("nextL");
	let prevR = document.getElementById("prevR");
	let nextR = document.getElementById("nextR");
	let curnL = document.getElementById("curnL");
	let curnR = document.getElementById("curnR");

	currentPage -= 2;

	prevL.id = "curnL";
	prevR.id = "curnR";
	curnL.id = "nextL";
	curnR.id = "nextR";
	nextL.remove();
	nextR.remove();
	createNewPage("prevL", getPath(currentPage - 2));
	createNewPage("prevR", getPath(currentPage - 1));
}

function goRight() {
	let prevL = document.getElementById("prevL");
	let nextL = document.getElementById("nextL");
	let prevR = document.getElementById("prevR");
	let nextR = document.getElementById("nextR");
	let curnL = document.getElementById("curnL");
	let curnR = document.getElementById("curnR");

	currentPage += 2;

	nextL.id = "curnL";
	nextR.id = "curnR";
	curnL.id = "prevL";
	curnR.id = "prevR";
	prevL.remove();
	prevR.remove();
	createNewPage("nextR", getPath(currentPage + 3));
	createNewPage("nextL", getPath(currentPage + 2));
}

function getPath(img){
	return `catalog/page (${img}).webp`;
}

function createNewPage(id, src){
	let root = document.getElementById("root");
	let element = document.createElement("img");

	element.id = id;
	element.classList.add("page");
	element.setAttribute("src", src);

	console.log(element, src);
	root.appendChild(element);
}
