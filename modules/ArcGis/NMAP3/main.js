const $ = (id) => document.getElementById(id);
const getActiveYear = () => $("yearsDatalist").getElementsByTagName("option")[parseInt($("rokyRange").value)].label;
const layersByYears = [	
	{ year: 1918, layers: [ 
		{ layerID: "443709212b894e9297888b3194b51100", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "61a605dca69c4aa0ac1b3858ba328fd3", opacity: 1.0, name: "obceSouc", featureLayer: null }
	] }	
]
const getLayersFromButtons = ["ORP", "obceSouc"]
let loadingProgress = {
	value: 0,
	max: [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => 0 ))).length,
};


require([
	"esri/config",
	"esri/views/MapView",
	"esri/Map",
	"esri/layers/FeatureLayer",
	"esri/layers/GraphicsLayer",
	"esri/layers/TileLayer",
	"esri/widgets/Expand",
	"esri/rest/query",
	"esri/rest/support/Query",
	"esri/widgets/Legend",
	"esri/widgets/Search"
], (
	esriConfig, MapView, Map, FeatureLayer, GraphicsLayer, TileLayer, Expand, query, Query, Legend, Search
) => {

	esriConfig.apiKey = "AAPK8bc6dada19fc40b495ff8ef292a6162bPTUaWG0rfCO_sIehiCZr8W72weLqN42yKhTPDbTK4S0XbpfyQYfb5RiVUvKkD9AB";

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

		layer.featureLayer.load().then(function() {
			$("loadingProgressbar").value = ++loadingProgress.value;
			$("loadingProgressbar").max = loadingProgress.max;
			if(loadingProgress.max === loadingProgress.value)
				$("loadingProgressbar").style.display = "none";
		});


	}

	layersByYears[parseInt($("rokyRange").value)].layers.forEach(createFL);
	layersByYears.forEach((layerByYear) => {	
		layerByYear.layers.forEach(createFL)
	});

	showLayerByYear(parseInt($("rokyRange").value));
	

	const concatedLayers = [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => layer.featureLayer )))

    //create graphic layer to display result of query
    const resultsLayer = new GraphicsLayer();
    //set query parameters to always return geometry and all fields
    const params = new Query({
        returnGeometry: true,
        outFields: ["*"]
    });
    const map = new Map({
        basemap: "osm",
        layers: concatedLayers
    });

    //Define popup content for each result
    //zatim neimplementovat



    const view = new MapView({
        map: map,
        container: "viewDiv",
        center: [15.79, 50.57],
        zoom: 11
    });
	
	
	document.getElementById("doBtn").addEventListener("click",doQuery);
		// var attributeName = document.getElementById("modulSelect");
		// //var attributeName = selModul.options[selModul.selectedIndex].textContent;

    	// const expressionSign = document.getElementById("signSelect");
    	// const inputValue = document.getElementById("jevSelect");
		// let expression;

		let attributeName;

	function doQuery() {
	var selModul = document.getElementById("jevSelect");
	var attributeName = selModul.options[selModul.selectedIndex].value;
	console.log("Ahoj");
	console.log(attributeName);

    const expressionSign = document.getElementById("signSelect");
	
	var selJev = document.getElementById("jevSelect");
    var inputValue = selJev.options[selJev.selectedIndex].text;

	let expression;
		
	expression = `${attributeName}${expressionSign.value}'${inputValue}'`;
		document.getElementById("printResults").innerHTML = expression;

		layersByYears.forEach(layerByYear =>
			layerByYear.layers.forEach(layer => {
				layer.featureLayer.definitionExpression = expression;	
			})
		)
		
	}
	

	

	//zobrazeni mapy s kategoriemi
	const obceKategorie = new FeatureLayer({
		portalItem: {
			id: "7f4735d813054cd89a718d1b7156112b"
		},
		outFields:["*"],
	});
	const legend = new Legend({
		view: view,
		layerInfos : [
			{ 
				layer: obceKategorie,
				title: "Počet obyvatel"
			}
		]
	});

	var testActivity = document.getElementById("jevSelect");
	// testActivity.addEventListener("change", (event) => {
	// 	map.add(obceKategorie);
	// 	view.ui.add(legend, "bottom-left");
	// })
	//search widget
	const searchWidget = new Search({
		view: view
	  });

	view.ui.add(searchWidget, {
		position: "top-right"
	  });
	
});



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
	$("rokyRange").value = newValue;
	$("yearLabel").innerText = getActiveYear();
	cngRok(newValue);
	showLayerByYear(newValue)
	updateSelectBox(getActiveYear())
}

function updateSelectBox(newValue){
	let layer = layersByYears.filter(layer => layer.year === parseInt(newValue))[0]
	$("attSelect").hidden = !layer.options.includes("attSelect")
	$("signSelect").hidden = !layer.options.includes("signSelect")
	$("valSelect").hidden = !layer.options.includes("valSelect")
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
moduly['0'] = [
	["Průmysl","Sektor"],
    ["Služby","Sektor"],
    ["Zemědělství","Sektor"]
];
moduly['1'] = [
	["Akciová společnost","Forma_podn"],
    ["Banka/pobočka banky","Forma_podn"],
	["Družstvo","Forma_podn"],
	["Komanditní společnost","Forma_podn"],
	["Podnik samosprávného celku","Forma_podn"],
	["Soukromá firma neurčeného typu","Forma_podn"],
	["Společnost r.o.","Forma_podn"],
	["Velkostatek","Forma_podn"],
	["Živnost","Forma_podn"]    
];				  
moduly['2'] = [
	
	["Cestovní ruch","Obor"],
	["Chemie","Obor"],
	["Doprava a cestovní ruch","Obor"],
	["Elektrotechnika","Obor"],
	["Energetika","Obor"],
	["Finance","Obor"],
	["Grafika a tisk","Obor"],
	["Hornictví, metalurgie, zpracování nerostů","Obor"],
	["Obchod a služby bez cestovního ruchu","Obor"],
	["Papírenství, dřevařství","Obor"],
	["Potravinářství","Obor"],
	["Sklo, porcelán a keramika","Obor"],
	["Stavebnictví","Obor"],
	["Strojírenství","Obor"],
	["Textilnictví , oděvnictví, obuvnictví, zpracování kůže","Obor"],
	["Zemědělství, rybářství, lesnictví","Obor"],
	["Ostatní","Obor"]
];				

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
			node.value = element[1];
			node.textContent = element[0];
			select.appendChild(node);
		});
		$("jevSelect").parentElement.replaceChild(select, $("jevSelect"));
	}
};
moduleChanged();