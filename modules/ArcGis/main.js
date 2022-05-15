const $ = (id) => document.getElementById(id);

require([
	"esri/views/MapView",
	"esri/Map",
	"esri/layers/FeatureLayer",
	"esri/layers/TileLayer",
	"esri/widgets/Expand"
], (
	MapView, Map, FeatureLayer, TileLayer, Expand
) => {
	let floodLayerView;

	layersByYears = [
		{ year: 1921, layers: [ 
			{ layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null },
			{ layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null },
			{ layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null },
		 ] },
		{ year: 1931, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 1941, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 1951, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 1961, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 1971, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 1981, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 1991, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 2001, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 2011, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
		{ year: 2021, layers: [ { layerID: "731b01b6041d437a83fb5b65bd9ade69", featureLayer: null } ] },
	]

	layersByYears.forEach((layerByYear) => {
		layerByYear.layers.forEach((layer) => { 
			layer.featureLayer = new FeatureLayer({ portalItem: { id: layer.layerID } })
		}) 
	})
	showLayerByYear(10);


	const streetsLayerToggle = $("streetsLayer");
	streetsLayerToggle.addEventListener("change", () => {
		layer.visible = streetsLayerToggle.checked;
	});

	const pointLayerToggle = $("pointLayer");
	pointLayerToggle.addEventListener("change", () => {
		pointLayer.visible = pointLayerToggle.checked;
	});

	const concatedLayers = [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => layer.featureLayer )))
	const map = new Map({
		basemap: "streets-vector",
		layers: concatedLayers,
	});

	const view = new MapView({
		map: map,
		container: "viewDiv",
		center: [15.79, 50.57],
		zoom: 9
	});

	const seasonsElement = $("seasons-filter");

	seasonsElement.addEventListener("click", filterBySeason);

	function filterBySeason(event) {
		const selectedSeason = event.target.getAttribute("data-season");
		floodLayerView.filter = {
			where: `idOkres = '${selectedSeason}'`
		};
	}
/*
	view.whenLayerView(layer).then((layerView) => {
		floodLayerView = layerView;

		seasonsElement.style.visibility = "visible";
		const seasonsExpand = new Expand({
			view: view,
			content: seasonsElement,
			expandIconClass: "esri-icon-filter",
			group: "top-left"
		});
		seasonsExpand.watch("expanded", () => {
			if (!seasonsExpand.expanded) {
				floodLayerView.filter = null;
			}
		});
		view.ui.add(seasonsExpand, "top-left");
	})
	*/
})

function showLayerByYear(year) {
	layersByYears.forEach((layerByYear, layerYear) => {
		layerByYear.layers.forEach((layer) => { 
			layer.featureLayer.visible = layerYear == year;
		}) 
	})
}

function changeYearDelta(delta){ 
	let op = $("yearsDatalist").getElementsByTagName("option");
	let newValue = parseInt($("rokyRange").value) + delta;
	if (newValue < 0 || newValue >= op.length) 
		return;

	changeYear(newValue)
}

function changeYear(newValue) {
	let op = $("yearsDatalist").getElementsByTagName("option");

	$("rokyRange").value = newValue;
	$("yearLabel").innerText = op[newValue].label;
	cngRok(newValue);
	showLayerByYear(newValue)
}

function cngRok(vol) {
	const vrstvy = {
		0: ["vrstva0"],
		1: ["vrstva1"],
		2: ["vrstva2"],
		3: ["vrstva3"],
		4: ["vrstva4"],
		5: ["vrstva5"],
		6: ["vrstva6"],
		7: ["vrstva7"],
		8: ["vrstva8"],
		9: ["vrstva9"]
	};
	const op = $("yearsDatalist").getElementsByTagName("option");
	if (op[vol].disabled == false) {
		a_vrstvy = vrstvy[vol];
	};
};

const moduly = [];
moduly[0] = ["Počet obyvatel", "Bydlící"];
moduly[1] = ["Česká", "Německá", "Slovenská"];
moduly[2] = ["Počet domů", "Počet ovcí"];
moduly[3] = ["Obydlí", "Polí"];
moduly[4] = ["Vlevo", "Vpravo", "Na severu"];
moduly[5] = ["Vdaná", "Ženatý", "Rozvedený"];
moduly[6] = ["Základní", "Střední", "Vysokoškolské"];
$("modulSelect").addEventListener("change", moduleChanged, false);
function moduleChanged () {
	let element = $("modulSelect");
	let newValue = moduly[element.value];
	if (newValue) {
		const select = $("jevSelect").cloneNode();
		const node = document.createElement("option");
		node.value = 0;
		node.setAttribute("disabled", true);
		node.setAttribute("selected", true);
		node.textContent = "Vyberte modul";
		select.appendChild(node);
		moduly[element.value].forEach(function (element) {
			let node = document.createElement("option");
			node.value = element;
			node.textContent = element;
			select.appendChild(node);
		});
		$("jevSelect").parentElement.replaceChild(select, $("jevSelect"));
	}
};
moduleChanged();