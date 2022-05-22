const $ = (id) => document.getElementById(id);
const getActiveYear = () => $("yearsDatalist").getElementsByTagName("option")[parseInt($("rokyRange").value)].label;
const layersByYears = [
	{ year: 1910, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1921, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1930, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1939, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1946, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1948, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1950, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1961, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1970, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1980, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 1991, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
	{ year: 2021, layers: [ 
		{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, name: "POU", featureLayer: null },
		{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, name: "obceSouc", featureLayer: null },
		{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, name: "katSoucPol", featureLayer: null },
		{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, name: "ZSJSoucBod", featureLayer: null },
		{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, name: "castObcPol", featureLayer: null },
		{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, name: "ZSJPol", featureLayer: null },
		{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, name: "soudOkresy", featureLayer: null }
	] },
]
const getLayersFromButtons = ["ORP", "POU", "obceSouc", "katSoucPol", "ZSJSoucBod", "castObcPol", "ZSJPol", "soudOkresy"]


require([
	"esri/views/MapView",
	"esri/Map",
	"esri/layers/FeatureLayer",
	"esri/layers/TileLayer",
	"esri/widgets/Expand"
], (
	MapView, Map, FeatureLayer, TileLayer, Expand
) => {
	// buttons from GUI with theirs IDs

	// add listeners to all buttons from GUI
	getLayersFromButtons.forEach((value) => {
		$(value).addEventListener("change", () => {
			layersFromButtonsChanged();
		});
	})
	
	const createFL = (layer) => { 
		if(layer.featureLayer !== null && layer.featureLayer !== undefined)
			return;
		layer.featureLayer = new FeatureLayer({ portalItem: {
			id: layer.layerID,
			opacity: layer.opacity !== undefined ? layer.opacity : 1.0,
			visible: false,
		} })
	}

	layersByYears[parseInt($("rokyRange").value)].layers.forEach(createFL);
	layersByYears.forEach((layerByYear) => {	
		layerByYear.layers.forEach(createFL)
	});

	showLayerByYear(parseInt($("rokyRange").value));
	

	const concatedLayers = [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => layer.featureLayer )))
	const map = new Map({
		basemap: "osm",
		//tady nevim jak ti funguje to concat - resp. kde vezmes nazev te vrstvy
		//layers: [layer, POU, obceSouc,katSoucPol,ZSJSoucBod,castObcPol,ZSJPol,soudOkresy]
		layers: concatedLayers,
	});

	const view = new MapView({
		map: map,
		container: "viewDiv",
		center: [15.79, 50.57],
		zoom: 9
	});
})

// when some button changed state
function layersFromButtonsChanged(){
	layersByYears[parseInt($("rokyRange").value)].layers.forEach((layer) => {
		if(!getLayersFromButtons.includes(layer.name))
			return;
		layer.featureLayer.visible = $(layer.name).checked;
	})
}

function changeYearLite(newValue){
	let op = $("yearsDatalist").getElementsByTagName("option");
	$("yearLabel").innerText = op[newValue].label
}

function showLayerByYear(year) {
	layersByYears.forEach((layerByYear, layerYear) => {
		layerByYear.layers.forEach((layer) => { 
			layer.featureLayer.visible = layerYear == year;
		}) 
	})
	layersFromButtonsChanged();
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
	$("yearLabel").innerText = getActiveYear();
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