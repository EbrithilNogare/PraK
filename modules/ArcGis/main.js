const $ = (id) => document.getElementById(id);
const getActiveYear = () => $("yearsDatalist").getElementsByTagName("option")[parseInt($("rokyRange").value)].label;
const layersByYears = [
	{
		year: 1910,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1921,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1930,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1939,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1946,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1947,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1949,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1950,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1961,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1970,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1980,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "6b1062d665274b69b1818ee125208231", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1991,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "40dfc84302cc4a9bb39cc7d4a442dc4b", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "249f6790deab4053814212e31d5523b7", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "7a2511b39d384be5aad394fe065a9bef", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "63403761afca4561beecc5ce9ddf3202", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "457534b3930c4716975d10294d845752", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 2021,
		layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, name: "POU" },
			{ layerID: "40dfc84302cc4a9bb39cc7d4a442dc4b", opacity: 0.9, featureLayer: null, name: "obceSouc" },
			{ layerID: "249f6790deab4053814212e31d5523b7", opacity: 0.9, featureLayer: null, name: "katSoucPol" },
			{ layerID: "7a2511b39d384be5aad394fe065a9bef", opacity: 0.9, featureLayer: null, name: "ZSJSoucBod" },
			{ layerID: "63403761afca4561beecc5ce9ddf3202", opacity: 0.9, featureLayer: null, name: "castObcPol" },
			{ layerID: "457534b3930c4716975d10294d845752", opacity: 0.9, featureLayer: null, name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
]
const getLayersFromButtons = ["ORP", "POU", "obceSouc", "katSoucPol", "ZSJSoucBod", "castObcPol", "ZSJPol", "soudOkresy"]
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
	//document.getElementById("doDel").addEventListener("click",doDelete);
	const attributeName = document.getElementById("attSelect");
    const expressionSign = document.getElementById("signSelect");
    const inputValue = document.getElementById("inputNumber");
	let expression;

	function doQuery() {
		expression = `${attributeName.value}${expressionSign.value}'${inputValue.value}'`;
		document.getElementById("printResults").innerHTML = expression;

		layersByYears.forEach(layerByYear =>
			layerByYear.layers.forEach(layer => {
				layer.featureLayer.definitionExpression = expression;	
			})
		)		
	}

	// function doDelete(){
	// 	map.removeAll();
	// }
	

	const queryPopUpTemplate = {
		title: "Název nějaké lokality: {}",
		content: [
			{
				type: "fields",
				fieldInfos: [
					{
						fieldName: "názevLoka",
						label: "Název lokality"
					},
					{
						fieldName: attributeName.value,
						label: attributeName.textContent
					},
					{
						fieldName: "typLokalit",
						label: "Typ lokality"
					}
				]

			}
		]
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
	testActivity.addEventListener("change", (event) => {
		map.add(obceKategorie);
		view.ui.add(legend, "bottom-left");
	})
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
	["Počet trvalých obyvatel 2021","početobyv"],
    ["Počet obvyklých obyvatel 2021","početob_1"],
    ["Počet obyvatel trvalých 2011","počet_o_1"],
    ["Počet obyvatel obvyklých 2011","počet_o_2"]
];
moduly['1'] = [
	["Česká národnost 2021","národno_1"],
    ["Německá národnost 2021","národnost"],
    ["Moravská národnost 2021","národno_2"],
    ["Slezská národnost 2021","národno_3"],
    ["Slovenská národnost 2021","národno_4"],
    ["Polská národnost 2021","národno_5"],
    ["Romská národnost 2021","národno_6"],,
    ["Ruská národnost 2021","národno_8"],
    ["Ukrajinská národnost 2021","národno_9"],
    ["Vietnamská národnost 2021","národno_10"]
];				  
moduly['2'] = [
	["Počet budov s čísly 2021","početbudo"],
    ["Počet budov s čísly 2011","počet_b_1"]
];
moduly['3'] = [
	["Výměra lokality 2021","rozlohalok"],
    ["Rozloha lokality 2011","rozloha__1"]
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