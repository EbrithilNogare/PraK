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

	//znovu jsem vlozil definice jednotlivych vrstev, 
	//nevim jak je definovat jinak JaPa

	const layer = new FeatureLayer({
        portalItem: {
          id: "abad00b4ad484e9bb66b499816f35876"
        },
        outFields: ["idOkres"]
      });
      const POULayer = new FeatureLayer({
        portalItem: {
          id: "afa4ff69d2f74f8b82b1ebdf002f07aa"
        },
        outFields: ["idOkres"],
        visible: false
      });

      const obceSoucLayer = new FeatureLayer({
        portalItem: {
          id: "6b1062d665274b69b1818ee125208231",
          opacity: 0.9
        }, 
        outFields: ["idOkres"],
        visible: false
      });

      const katSoucPol = new FeatureLayer({
        portalItem: {
          id: "06dd8a47823c435eaa943daaceb9ef3f",
          opacity: 0.9
        }, 
        outFields: ["idOkres"],
        visible: false
      });

      const ZSJSoucBod = new FeatureLayer({
        portalItem: {
          id: "31680445e4994b0fbe75034f2a39236c",
          opacity: 0.9
        }, 
        outFields: ["idOkres"],
        visible: false
      });

      const castObcPol = new FeatureLayer({
        portalItem: {
          id: "c0df9f209d1445618083f0d906ea3571",
          opacity: 0.9
        }, 
        outFields: ["idOkres"],
        visible: false
      });

      const ZSJPol = new FeatureLayer({
        portalItem: {
          id: "e1dd7e7c83c141e7b092b47c30577743",
          opacity: 0.9
        }, 
        outFields: ["idOkres"],
        visible: false
      });  
      
      const soudOkresyLayer = new FeatureLayer({
        portalItem: {
          id: "1cfec9b5ee5244c6bc78208576208d69",
          opacity: 0.9
        }, 
        visible: false
      });   

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
		{ year: 2021, layers: [ 
			{ layerID: "abad00b4ad484e9bb66b499816f35876", name: "layer", featureLayer: null },
			{ layerID: "afa4ff69d2f74f8b82b1ebdf002f07aa", name: "POULayer", featureLayer: null },
			{ layerID: "6b1062d665274b69b1818ee125208231", name: "obceSoucLayer", featureLayer: null },
			{ layerID: "06dd8a47823c435eaa943daaceb9ef3f", name: "katSoucPol", featureLayer: null },
			{ layerID: "31680445e4994b0fbe75034f2a39236c", name: "ZSJSoucBod", featureLayer: null },
			{ layerID: "c0df9f209d1445618083f0d906ea3571", name: "castObcPol", featureLayer: null },
			{ layerID: "e1dd7e7c83c141e7b092b47c30577743", name: "ZSJPol", featureLayer: null },
			{ layerID: "1cfec9b5ee5244c6bc78208576208d69", name: "soudOkresyLayer", featureLayer: null }
		 ] },
	]

	layersByYears.forEach((layerByYear) => {
		layerByYear.layers.forEach((layer) => { 
			layer.featureLayer = new FeatureLayer({ portalItem: { id: layer.layerID } })
		}) 
	})
	showLayerByYear(10);


	const ORPLayerToggle = $("ORPLayer");
    ORPLayerToggle.addEventListener("change", () => {
        layer.visible = ORPLayerToggle.checked;
      });
	
	const POULayerToggle = $("POULayer");
    POULayerToggle.addEventListener("change", () => {
        POULayer.visible = POULayerToggle.checked;
      });
	
	const obceSoucLayerToggle = $("obceSouc");
    obceSoucLayerToggle.addEventListener("change", () => {
        obceSoucLayer.visible = obceSoucLayerToggle.checked;
      });

	const katSoucPolLayerToggle = $("katSoucPol");
    katSoucPolLayerToggle.addEventListener("change", () => {
        katSoucPol.visible = katSoucPolLayerToggle.checked;
      });

	const ZSJSoucBodLayerToggle = $("ZSJSoucBod");
    ZSJSoucBodLayerToggle.addEventListener("change", () => {
        ZSJSoucBod.visible = ZSJSoucBodLayerToggle.checked;
      });

	const castObcPolLayerToggle = $("castObcPol");
    castObcPolLayerToggle.addEventListener("change", () => {
        castObcPol.visible = castObcPolLayerToggle.checked;
      });

	const ZSJPolLayerToggle = $("ZSJPol");
    ZSJPolLayerToggle.addEventListener("change", () => {
        ZSJPol.visible = ZSJPolLayerToggle.checked;
      });

	const soudOkresyLayerToggle = $("soudOkresy");
	soudOkresyLayerToggle.addEventListener("change", () => {
        soudOkresyLayer.visible = soudOkresyLayerToggle.checked;
      }); 


	// const streetsLayerToggle = $("streetsLayer");
	// streetsLayerToggle.addEventListener("change", () => {
	// 	layer.visible = streetsLayerToggle.checked;
	// });

	// const pointLayerToggle = $("pointLayer");
	// pointLayerToggle.addEventListener("change", () => {
	// 	pointLayer.visible = pointLayerToggle.checked;
	// });

	const concatedLayers = [].concat(...layersByYears.map((layerByYear) => layerByYear.layers.map((layer) => layer.featureLayer )))
	const map = new Map({
		basemap: "osm",
		//tady nevim jak ti funguje to concat - resp. kde vezmes nazev te vrstvy
		layers: [layer, POULayer, obceSoucLayer,katSoucPol,ZSJSoucBod,castObcPol,ZSJPol,soudOkresyLayer]
		//layers: concatedLayers,
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
//jenom jsem to odkomentoval, aby bylo videt
//jak to funguje
	view.whenLayerView(obceSoucLayer).then((layerView) => {
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