const $ = (id) => document.getElementById(id);
const getActiveYear = () => $("yearsDatalist").getElementsByTagName("option")[parseInt($("rokyRange").value)].label;
const layersByYears = [	
	{ year: 1918, layers: [ 
		{ layerID: "5a1c204f69644a9ea5034965f285a078", opacity: 1.0, name: "ORP", featureLayer: null }		
	] }	
]
const getLayersFromButtons = ["ORP"]
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
        center: [11.60, 50.06],
        zoom: 3
    });
	
	
	document.getElementById("doBtn").addEventListener("click",doQuery);
	document.getElementById("doDel").addEventListener("click",doDelete);
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

	function doDelete(){
		view.map.layers.map(function(lyr){
			//console.info(lyr);
			lyr.visible = false;
			window.location.reload();
		})

		var activeCheckBox = document.querySelectorAll('input[type="checkbox"]:checked');
		var numActive = activeCheckBox.length;
		// console.log(activeCheckBox);
		// console.log("Pocet zaskrtnutych " + numActive);
		if (numActive>=1) {
			for (let i = 0; i < activeCheckBox.length; i++) {
				if (activeCheckBox[i].checked = true) {
					activeCheckBox[i].checked = false;
				}				
			}
		}
	};
	
	

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
	["Archivy","Typ_korpor"],
    ["Knihovny","Typ_korpor"],
    ["Muzea","Typ_korpor"],
    ["Odborné ústavy","Typ_korpor"],
    ["Soukromé sbírky","Typ_korpor"],
    ["Spolky","Typ_korpor"],
    ["Státní úřady","Typ_korpor"],
    ["Vědecké instituce","Typ_korpor"],
    ["Veřejné korporace","Typ_korpor"]
];
moduly['1'] = [
	["Centrální","Centráln"],
    ["Regionální","Centráln"]   
];	
moduly['2'] = [
	
	["Institucionální","Soukromá_"],
	["Soukromá","Soukromá_"]
];					  
moduly['3'] = [
	
	["Malé množství","Malé_mno"],
	["Střední množství","Malé_mno"],
	["Velké množství","Malé_mno"]
];		
moduly['4'] = [
	["Částečně zpracováno","Zpracován"],
	["Nezpracováno","Zpracován"],
    ["Zpracováno","Zpracován"]   
];	
moduly['5'] = [
	["Malý význam","Malý_výz"],
    ["Střední význam","Malý_výz"],
    ["Zásadní význam","Malý_výz"] 
];	
moduly['6'] = [
	["Knihovní fondy","Knihovní_"],
	["Archivní fondy","Archivní_"],
	["Mapové sbírky","Mapové_sb"],
	["Digitální služby","Digitáln"],
	["Mapové portály","Mapové_po"],
	["Muzejní sbírky","Muzejní_s"], 
	["Neviditelné prameny","Neviditeln"],
	["Stálé expozice","Stálé_ex"]
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