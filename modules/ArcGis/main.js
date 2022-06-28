const $ = (id) => document.getElementById(id);
const getActiveYear = () => $("yearsDatalist").getElementsByTagName("option")[parseInt($("rokyRange").value)].label;
const layersByYears = [
	{
		year: 1910,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "f14869d64d1c459a8d1974ec91b59936", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "1470f53a79744a42875a473332c3233d", opacity: 0.9, featureLayer: null, infoLayer: "osady", name: "katSoucPol" },
			{ layerID: "0e62e767acbb451994ac276b008d00d4", opacity: 0.9, featureLayer: null, infoLayer: "častOsady", name: "ZSJSoucBod" },
			{ layerID: "b785e7046d454db7869a6d3b877f9c1d", opacity: 0.9, featureLayer: null, infoLayer: "katastry", name: "castObcPol" },
			{ layerID: "8e76bbc2638141c0a519dc51cdbbeb82", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
			
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1921,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "f0b3d154c1c14f468fa08db55f5aee3d", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "94f382c6fd23405a9ef829aa93d90933", opacity: 0.9, featureLayer: null, infoLayer: "osady", name: "katSoucPol" },
			{ layerID: "8f00335f1dbc4e178f0ad1660c358ca6", opacity: 0.9, featureLayer: null, infoLayer: "častOsady", name: "ZSJSoucBod" },
			{ layerID: "18afa04e3bbc48d4b9d99bab2ea700ef", opacity: 0.9, featureLayer: null, infoLayer: "katastry", name: "castObcPol" },
			{ layerID: "c38ca29b33dd434788b4b19cce61f62f", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1930,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "b45aa40436a34772a99a48449954c691", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "b877ea49ad90497cb1e0fe23e6cab248", opacity: 0.9, featureLayer: null, infoLayer: "osady", name: "katSoucPol" },
			{ layerID: "d3f8947b5bff47afae9a05ef3fe4d305", opacity: 0.9, featureLayer: null, infoLayer: "častOsady", name: "ZSJSoucBod" },
			{ layerID: "ede1ce8b4190480499531911810f9d45", opacity: 0.9, featureLayer: null, infoLayer: "katastry", name: "castObcPol" },
			{ layerID: "3e532488183940e9b4079dfd6b5dbcc8", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1939,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "69710b2ee1714df0af301754553fd51e", opacity: 0.9, featureLayer: null, infoLayer: "obceProtektorát", name: "obceSouc" },
			{ layerID: "facd83be40074f059fd38d4405b39dbd", opacity: 0.9, featureLayer: null, infoLayer: "osadyProtektorát", name: "katSoucPol" },
			{ layerID: "502fe8f634e741f5b4535c82367920dc", opacity: 0.9, featureLayer: null, infoLayer: "obceZupa", name: "castObcPol" },
			{ layerID: "d47a7fee2cda494cacefed3bf7a11684", opacity: 0.9, featureLayer: null, infoLayer: "osadyZupa", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},	
	{
		year: 1946,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "85cedcb67daf432783070b1ff80f3c6b", opacity: 0.9, featureLayer: null, infoLayer: "obceAS", name: "obceSouc" },
			{ layerID: "418371d97cb64e498ec8f74391e2f12d", opacity: 0.9, featureLayer: null, infoLayer: "obceSO", name: "katSoucPol" },
			{ layerID: "955bd3d4ff5e4c87a28125ad5cc4026c", opacity: 0.9, featureLayer: null, infoLayer: "castobceSO", name: "ZSJSoucBod" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1947,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "151a1de9355746589dc595c6a8e9fc86", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},	
	{
		year: 1949,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "71c5311066bf4647b769ef8b7082f0f0", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "08816206c1dd42d28e9f874eb8d86989", opacity: 0.9, featureLayer: null, infoLayer: "katastry", name: "castObcPol" },
			{ layerID: "9c2b2b92ab304468b7771c43f8d6b4ff", opacity: 0.9, featureLayer: null, infoLayer: "castObce", name: "ZSJSoucBod" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},	
	{
		year: 1950,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "3ea069ea8f74401a94923ae325eaff85", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "e12e86b19fd4413d94f721ffcc6c7732", opacity: 0.9, featureLayer: null, infoLayer: "osady", name: "katSoucPol" },
			{ layerID: "f84ff296714c469a9d92b00d482f4d2d", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1961,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "dd89cf410a1d4a99aa8765e3ac6f9f02", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "b6c32c7b93a7492fa49695b3ccfdd4ab", opacity: 0.9, featureLayer: null, infoLayer: "osady", name: "katSoucPol" },
			{ layerID: "abfffe7b10be4b3ab3f1a4e7f3ccbf7d", opacity: 0.9, featureLayer: null, infoLayer: "častOsady", name: "ZSJSoucBod" },
			{ layerID: "f8b792aa30124db79c346f644760afdb", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1970,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "ec526d1f591c49d1ad8d04f3050f3c7f", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "63a45993d68c4685b8d3ad5d91cc5973", opacity: 0.9, featureLayer: null, infoLayer: "častOsady", name: "ZSJSoucBod" },
			{ layerID: "4bbf704bef4a4f24af0c9a96280dda52", opacity: 0.9, featureLayer: null, infoLayer: "ZSJ", name: "castObcPol" },
			{ layerID: "6bdabaef62674e5f91387cf6fffdbb0b", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1980,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "e099975527404159a4ecbe2e61a528e4", opacity: 0.9, featureLayer: null, infoLayer: "obce", name: "obceSouc" },
			{ layerID: "0790ee9e0feb44fc849f6b23deab0986", opacity: 0.9, featureLayer: null, infoLayer: "castObce", name: "ZSJSoucBod" },
			{ layerID: "5eed39b9cab74a62ad60137ad974c5eb", opacity: 0.9, featureLayer: null, infoLayer: "ZSJ", name: "castObcPol" },
			{ layerID: "e1a80c1084084b979706c24225fd91b3", opacity: 0.9, featureLayer: null, infoLayer: "pavouk", name: "ZSJPol" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 1991,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "ORP", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "POU", name: "POU" },
			{ layerID: "abbefe51db4e4a5784578f6bfe5fd8df", opacity: 0.9, featureLayer: null, infoLayer: "ZSJ", name: "castObcPol" },
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
	{
		year: 2021,
		layers: [
			{ layerID: "abad00b4ad484e9bb66b499816f35876", opacity: 1.0, featureLayer: null, infoLayer: "obce1910", name: "ORP" },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", opacity: 1.0, featureLayer: null, infoLayer: "obce1910", name: "POU" },
			{ layerID: "40dfc84302cc4a9bb39cc7d4a442dc4b", opacity: 0.9, featureLayer: null, infoLayer: "obce1910", name: "obceSouc" },
			{ layerID: "249f6790deab4053814212e31d5523b7", opacity: 0.9, featureLayer: null, infoLayer: "obce1910", name: "katSoucPol" },
			{ layerID: "02eb858eb6ca4d5fa6ddb2ad16f92c63", opacity: 0.9, featureLayer: null, infoLayer: "obce1910", name: "ZSJSoucBod" },
			{ layerID: "63403761afca4561beecc5ce9ddf3202", opacity: 0.9, featureLayer: null, infoLayer: "obce1910", name: "castObcPol" },
			{ layerID: "457534b3930c4716975d10294d845752", opacity: 0.9, featureLayer: null, infoLayer: "obce1910", name: "ZSJPol" },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", opacity: 0.9, featureLayer: null, infoLayer: "obce1910", name: "soudOkresy" }
		],
		options: ["attSelect", "signSelect", "valSelect"],
	},
]
const getLayersFromButtons = ["ORP", "POU", "obceSouc", "katSoucPol", "ZSJSoucBod", "castObcPol", "ZSJPol", "soudOkresy"]
let loadingProgress = {
	value: 0,
	max: [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => 0))).length,
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
		if (layer.featureLayer !== null && layer.featureLayer !== undefined)
			return;

		layer.featureLayer = new FeatureLayer({
			portalItem: {
				id: layer.layerID,
				opacity: layer.opacity !== undefined ? layer.opacity : 1.0,
				visible: false,
			}
		})

		layer.featureLayer.load().then(function () {
			$("loadingProgressbar").value = ++loadingProgress.value;
			$("loadingProgressbar").max = loadingProgress.max;
			if (loadingProgress.max === loadingProgress.value)
				$("loadingProgressbar").style.display = "none";
		});


	}

	layersByYears[parseInt($("rokyRange").value)].layers.forEach(createFL);
	layersByYears.forEach((layerByYear) => {
		layerByYear.layers.forEach(createFL)
	});

	showLayerByYear(parseInt($("rokyRange").value));


	const concatedLayers = [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => layer.featureLayer)))

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


	document.getElementById("doBtn").addEventListener("click", doQuery);
	document.getElementById("doDel").addEventListener("click", doDelete);
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

	function doDelete() {
		view.map.layers.map(function (lyr) {
			//console.info(lyr);
			lyr.visible = false;
			window.location.reload();
		})

		var activeCheckBox = document.querySelectorAll('input[type="checkbox"]:checked');
		var numActive = activeCheckBox.length;
		// console.log(activeCheckBox);
		// console.log("Pocet zaskrtnutych " + numActive);
		if (numActive >= 1) {
			for (let i = 0; i < activeCheckBox.length; i++) {
				if (activeCheckBox[i].checked = true) {
					activeCheckBox[i].checked = false;
				}
			}
		}
	};

	// var s = document.getElementById("jevSelect").value;

	// if (s == "početobyv") {
	// 	alert("Ahoj" + s)
	// }

	document.getElementById("jevSelect").addEventListener('change', function(){
		var s = this.value;

		if (s == "početobyv") {
			showLayer("7f4735d813054cd89a718d1b7156112b","Počet trvalých obyvatel obce 2021");
		}
		else if (s == "početob_1") {
			showLayer("07e39b8ed447407d925d6c73ff1ef985","Počet obvyklých obyvatel obce 2021");
		}		
		else if (s == "počet_o_1") {
			showLayer("1f31d5f7f95249919a1879415af7a950","Počet trvalých obyvatel obce 2011");
		}
		else if (s == "počet_o_2") {
			showLayer("9e92579c8ed24660bbe7d4391056630c","Počet obvyklých obyvatel obce 2011");
		}
		else if (s == "počet_b_1") {
			showLayer("cd45375e05fa4fcba872261ddec0eb2e","Počet budov s čísly 2011");
		}
		else if (s == "početbudo") {
			showLayer("eab2e77593d2465fa8c617c1b0087a5b","Počet domů s čísly 2021");
		}
		else if (s == "rozloha__1") {
			showLayer("08e9d94ff80f49cf93bd6bb3e18113d6","Rozloha lokality 2011");
		}
		else if (s == "rozlohalok") {
			showLayer("869959c0db214a419870bd20fa93fcfa","Rozloha lokality 2021");
		}
		else if (s == "národno_1") {
			showLayer("1637098666904d20811139305956a5b5","Česká národnost 2021");
		}
		else if (s == "národnost") {
			showLayer("d04a7198ae5b4db896f72c09cc80f325","Německá národnost 2021");
		}
		
	})

	function testResult(idNumber, titleText){
		var val;
		val = idNumber + titleText;
		return val;
	}

	
	function showLayer(idNumber, titleText){
		
		const obceKategorie = new FeatureLayer({
			portalItem: {
				id: idNumber
				//id: "7f4735d813054cd89a718d1b7156112b"
			},
			outFields:["*"],
		});
		const legend = new Legend({
			view: view,
			layerInfos : [
				{ 
					layer: obceKategorie,
					title: titleText
					//title: "Počet obyvatel"
				}
			]
		});
		map.remove(obceKategorie);
		
		
		map.add(obceKategorie);
		obceKategorie.visible = true;
		view.ui.add(legend, "bottom-left");
	}



	//zobrazeni mapy s kategoriemi
	// const obceKategorie = new FeatureLayer({
	// 	portalItem: {
	// 		id: "7f4735d813054cd89a718d1b7156112b"
	// 	},
	// 	outFields: ["*"],
	// });

	const obceKategorie = new FeatureLayer({
		portalItem: {
			id: "63403761afca4561beecc5ce9ddf3202"
		},
		outFields: ["*"],
	});

	const legend = new Legend({
		view: view,
		layerInfos: [
			{
				layer: obceKategorie,
				title: "Počet obyvatel"
			}
		]
	});

	// var testActivity = document.getElementById("jevSelect");
	// testActivity.addEventListener("change", (event) => {
	// 	map.add(obceKategorie);
	// 	obceKategorie.visible = true;
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
function layersFromButtonsChanged() {
	layersByYears[parseInt($("rokyRange").value)].layers.forEach((layer) => {
		if (!getLayersFromButtons.includes(layer.name))
			return;
		console.log(layer)
		if ($(layer.name)){
			layer.featureLayer.visible = $(layer.name).checked;
		}	
		else {
			layer.featureLayer.visible = false;
		}	
	})
}

function changeYearLite(newValue) {
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

function changeYearDelta(delta) {
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

function updateSelectBox(newValue) {
	let layer = layersByYears.filter(layer => layer.year === parseInt(newValue))[0]
	$("attSelect").hidden = !layer.options.includes("attSelect")
	$("signSelect").hidden = !layer.options.includes("signSelect")
	// $("valSelect").hidden = !layer.options.includes("valSelect")
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
	["Počet trvalých obyvatel 2021", "početobyv"],
	["Počet obvyklých obyvatel 2021", "početob_1"],
	["Počet obyvatel trvalých 2011", "počet_o_1"],
	["Počet obyvatel obvyklých 2011", "počet_o_2"]
];
moduly['1'] = [
	["Česká národnost 2021", "národno_1"],
	["Německá národnost 2021", "národnost"]
];
moduly['2'] = [
	["Počet budov s čísly 2021", "početbudo"],
	["Počet budov s čísly 2011", "počet_b_1"]
];
moduly['3'] = [
	["Výměra lokality 2021", "rozlohalok"],
	["Rozloha lokality 2011", "rozloha__1"]
];


$("modulSelect").addEventListener("change", moduleChanged, false);
function moduleChanged() {
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

function myPopupFunction() {
	var popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
}