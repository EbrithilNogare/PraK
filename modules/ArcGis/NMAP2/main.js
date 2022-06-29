const $ = (id) => document.getElementById(id);
const getActiveYear = () => $("yearsDatalist").getElementsByTagName("option")[parseInt($("rokyRange").value)].label;
const layersByYears = [	
	{ year: 1918, layers: [ 
		{ layerID: "28d600499c6d4060a6a2f8bea020d304", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "61a605dca69c4aa0ac1b3858ba328fd3", opacity: 1.0, name: "obceSouc", featureLayer: null },
		//{ layerID: "61a605dca69c4aa0ac1b3858ba328fd3", opacity: 1.0, name: "zeleznice", featureLayer: null },
		{ layerID: "5a45f3e4837f4515bd87365a7165f215", opacity: 1.0, name: "zelezniceSouc", featureLayer: null }
	] },
	{ year: 1936, layers: [ 
		{ layerID: "901ffd24c6d0482e9200a3baa2204c61", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "61a605dca69c4aa0ac1b3858ba328fd3", opacity: 1.0, name: "obceSouc", featureLayer: null },
		{ layerID: "92d4feb6383a482bac2542c2d703b660", opacity: 1.0, name: "zeleznice", featureLayer: null },
		{ layerID: "5a45f3e4837f4515bd87365a7165f215", opacity: 1.0, name: "zelezniceSouc", featureLayer: null },
		{ layerID: "e3a18dddaea842e880293449a06e1d77", opacity: 1.0, name: "silnice", featureLayer: null },
		{ layerID: "800a5c6b90264e6e9615136de81681d9", opacity: 1.0, name: "silniceSouc", featureLayer: null }
	] },
	{ year: 1950, layers: [ 
		{ layerID: "ac86e367126b456cbd926954e2873d0e", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "61a605dca69c4aa0ac1b3858ba328fd3", opacity: 1.0, name: "obceSouc", featureLayer: null },
		{ layerID: "edc33f5035ef49d2aa250b963df14238", opacity: 1.0, name: "zeleznice", featureLayer: null },
		{ layerID: "5a45f3e4837f4515bd87365a7165f215", opacity: 1.0, name: "zelezniceSouc", featureLayer: null },
		{ layerID: "92eabea5425345eaab1e86feda8db7de", opacity: 1.0, name: "silnice", featureLayer: null },
		{ layerID: "800a5c6b90264e6e9615136de81681d9", opacity: 1.0, name: "silniceSouc", featureLayer: null }
	] },
	{ year: 1981, layers: [ 
		{ layerID: "3c14e174a5d24ba2bbc454b9b5edb7c8", opacity: 1.0, name: "ORP", featureLayer: null },
		{ layerID: "61a605dca69c4aa0ac1b3858ba328fd3", opacity: 1.0, name: "obceSouc", featureLayer: null },
		{ layerID: "6883b5fcc8644287a7c3fed92176437f", opacity: 1.0, name: "zeleznice", featureLayer: null },
		{ layerID: "5a45f3e4837f4515bd87365a7165f215", opacity: 1.0, name: "zelezniceSouc", featureLayer: null },
		{ layerID: "b196d475d1b34975b44942ab390bf003", opacity: 1.0, name: "silnice", featureLayer: null },
		{ layerID: "800a5c6b90264e6e9615136de81681d9", opacity: 1.0, name: "silniceSouc", featureLayer: null }
	] },
	
]
const getLayersFromButtons = ["ORP", "obceSouc", "zeleznice", "zelezniceSouc", "silnice", "silniceSouc"]
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

	const labelClass = {
		symbol: {
			type: "text",  // autocasts as new TextSymbol()
			color: "green",
			font: {  // autocast as new Font()
			  family: "Playfair Display",
			  size: 12,
			  weight: "bold"
			}
		  },
		  labelPlacement: "above-center",
		  labelExpressionInfo: {
			expression: "$feature.Název"
		  }
	}

	
	
	const createFL = (layer) => {
		if(layer.featureLayer !== null && layer.featureLayer !== undefined)
			return;

		layer.featureLayer = new FeatureLayer({ portalItem: {
			id: layer.layerID,
			opacity: layer.opacity !== undefined ? layer.opacity : 1.0,
			visible: false,
		 }
		//, labelingInfo: [labelClass]
	 })

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
        center: [15.75, 50.62],
        zoom: 11
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
	["Primární","Sektor"],
    ["Sekundární","Sektor"],
    ["Terciární","Sektor"]
];
moduly['1'] = [
	["Akciová společnost","Forma_podn"],
    ["Banka/pobočka banky","Forma_podn"],
	["Družstvo","Forma_podn"],
	["Jednotné zemědělské družstvo","Forma_podn"],
	["Komanditní společnost","Forma_podn"],
	["Národní/Státní podnik","Forma_podn"],
	["Podnik samosprávného celku (městský, komunální, okresní, krajský, zemský)","Forma_podn"],
	["Soukromá firma neurčeného typu","Forma_podn"],
	["Společnost r.o.","Forma_podn"],
	["Státní statek","Forma_podn"],
	["Strojní a traktorová stanice","Forma_podn"],
	["Velkostatek","Forma_podn"],
	["Veřejná společnost obchodní","Forma_podn"],
	["Zbytkový statek","Forma_podn"],
	["Živnost","Forma_podn"]    
];				  
moduly['2'] = [	
	["Chemie","Obor"],
	["Doprava a cestovní ruch","Obor"],
	["Elektrotechnika","Obor"],
	["Energetika","Obor"],
	["Finance","Obor"],
	["Grafika a tisk","Obor"],
	["Hornictví, metalurgie, zpracování nerostů","Obor"],
	["Chemie","Obor"],
	["Obchod a služby bez cestovního ruchu","Obor"],	
	["Papírenství, dřevařství","Obor"],
	["Potravinářství","Obor"],
	["Sklo, porcelán a keramika","Obor"],
	["Stavebnictví","Obor"],
	["Strojírenství","Obor"],
	["Textilnictví , oděvnictví, obuvnictví, zpracování kůže","Obor"],
	["Zdravotnictví a školství","Obor"],
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