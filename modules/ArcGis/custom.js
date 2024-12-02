let yearRangeSelecter = document.querySelector("#rokyRange");
let rangePrevBtn = document.querySelector(".rangePrevBtn");
let rangeNextBtn = document.querySelector(".rangeNextBtn");

yearRangeSelecter.addEventListener("change", updateLayerGrid)

rangePrevBtn.addEventListener("click", updateLayerGrid)
rangeNextBtn.addEventListener("click", updateLayerGrid)

function updateLayerGrid() {
    let selectedYear = getYearValue(yearRangeSelecter.value);
    let selectedYearData = getSelectedYearData(selectedYear);
    let layersGridEl = document.querySelector(".layersGrid");
    layersGridEl.innerHTML = "";
    for (const property in selectedYearData) {
        const data = selectedYearData[property];
        layersGridEl.innerHTML += `
        <div class="mui-checkbox">
			<label style="color:${data.color};text-shadow: 1px -1px grey;" >
				<input type="checkbox" id="${property}" ${data.checked ? 'checked' : ''} >
				${data.label}
			</label>
		</div>
        `;
    }
    //updateSignSelect(selectedYear);   
    updateFilterSelect(selectedYear); 
    getLayersFromButtons.forEach((value) => {
        if ($(value)){
            $(value).addEventListener("change", () => {
                layersFromButtonsChanged();
            });
        }		
	})
}

function updateSignSelect(year) {
    let selectedYearData = getSelectedYearOptionsData(year);
    let signSelectEl = document.querySelector("#jevSelect");
    signSelectEl.innerHTML = "";
    for (const property in selectedYearData) {
        signSelectEl.innerHTML += `
        <option value="${property}">${selectedYearData[property]}</option>
        `;
    }
}

function updateFilterSelect(year) {
    let selectedYearData = getSelectedYearOptionsFilterData(year);
    let signSelectEl = document.querySelector("#attSelect");
    signSelectEl.innerHTML = "";
    for (const property in selectedYearData) {
        signSelectEl.innerHTML += `
        <option value="${property}">${selectedYearData[property]}</option>
        `;
    }
}

function getYearValue(value) {
    let yearsDatalist = document.querySelector("#yearsDatalist");
    let selectedYear = 0;
    Array.from(yearsDatalist.children).forEach((item) => {
        if (item.getAttribute("value") === value) {
            selectedYear = item.getAttribute("label");
        }
    })
    return selectedYear;
}

function getSelectedYearData(year) {
    let selectedYearDataObj = {};
    for (const property in yearsInputsDataList) {
        if (property === year) {
            selectedYearDataObj = yearsInputsDataList[property];
        }
    }
    return selectedYearDataObj;
}

function getSelectedYearOptionsData(year) {
    let selectedYearDataObj = {};
    for (const property in yearsOptionsDataList) {
        if (property === year) {
            selectedYearDataObj = yearsOptionsDataList[property];
        }
    }
    return selectedYearDataObj;
}

function getSelectedYearOptionsFilterData(year) {
    let selectedYearDataObj = {};
    for (const property in yearsFilterDataList) {
        if (property === year) {
            selectedYearDataObj = yearsFilterDataList[property];
        }
    }
    return selectedYearDataObj;
}
//inputs for Vrstvy div by year
//vstupy pro přepinaní vrstev
const redColor = "red";
const greyColor = "yellow";
const greenColor = "green";
const greenyellow = "greenyellow";
const blueColor = "rgb(51, 204, 255)";
const lightgreenColor = "rgb(0, 255, 153)";
const darkgreenColor = "rgb(0, 153, 51)";
const brownColor = "rgb(255, 153, 0)";


const yearsInputsDataList = {
    "1910": {
        "ORP": {"label": "Obce s rozšířenou působností 2021", "color":redColor, "checked": false},
        "POU": {"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "katSoucPol": {"label":  "Osady 1910","color":greenColor, "checked": false},
        "ZSJSoucBod": {"label": "Místní část 1910","color":greenyellow, "checked": false},
        "castObcPol": {"label": "Katastrální území 1910","color":blueColor, "checked": false},        
        "obceSouc": {"label": "Obce 1910","color":darkgreenColor, "checked": true},
        "ZSJPol": {"label": "Struktura obce 1910","color":lightgreenColor, "checked": false},
        "soudOkresy": {"label": "Soudní okresy 1946","color":brownColor, "checked": false},
        
    },
    "1921": {
        "ORP":{"label":  "Obce s rozšířenou působností 2021", "color":redColor, "checked": false},
        "POU":{"label":  "Obce s pověřeným obecním úřadem 2021", "color":greyColor, "checked": false},
        "katSoucPol":{"label":  "Osady 1921", "color":greenColor, "checked": false},
        "ZSJSoucBod":{"label":  "Místní část 1921", "color":greenyellow, "checked": false},
        "castObcPol":{"label":  "Katastrální území 1921", "color":blueColor, "checked": false},
        "obceSouc":{"label":  "Obce 1921", "color":darkgreenColor, "checked": true},
        "ZSJPol":{"label":  "Struktura obce 1921", "color":darkgreenColor, "checked": false},
        "soudOkresy": {"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1930": {
        "ORP": {"label":"Obce s rozšířenou působností 2021", "color":redColor, "checked": false},
        "POU": {"label":"Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "katSoucPol":{"label": "Osady 1930","color":greenColor, "checked": false},
        "ZSJSoucBod":{"label": "Místní část 1930","color":greenyellow, "checked": false},
        "castObcPol":{"label": "Katastrální území 1930","color":blueColor, "checked": false},
        "obceSouc": {"label":"Obce 1930","color":darkgreenColor, "checked": true},
        "ZSJPol": {"label":"Struktura obce 1930","color":darkgreenColor, "checked": false},
        "soudOkresy": {"label":"Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1939": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU": {"label":"Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "katSoucPol":{"label": "Osady Protektorát 1939", "color":greenColor, "checked": false},       
        "obceSouc":{"label": "Obce Protektorát 1939",    "color":darkgreenColor, "checked": false},           
        "castObcPol":{"label": "Obce Župa 1939", "color":lightgreenColor, "checked": true},
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    },   
    "1946": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "obceSouc":{"label": "Obce 1946 Archivni soupis","color":blueColor, "checked": false},  
        "katSoucPol":{"label": "Obce 1946 Soupis obyvatel","color":darkgreenColor, "checked": false},
        "ZSJSoucBod":{"label": "Části obce 1946 Soupis obyvatel","color":lightgreenColor, "checked": true},
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1947": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "obceSouc":{"label": "Obce 1947","color":darkgreenColor, "checked": true},
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1949": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "obceSouc":{"label": "Obce 1949","color":darkgreenColor, "checked": true},
        "ZSJSoucBod": {"label":"Část obce 1949","color":blueColor, "checked": false},  
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    },   
    "1950": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "katSoucPol":{"label": "Osady 1950","color":greenColor, "checked": false},
        "obceSouc": {"label":"Obce 1950","color":darkgreenColor, "checked": true},
        "ZSJPol":{"label": "Struktura obce 1950","color":lightgreenColor, "checked": false},
        "soudOkresy": {"label":"Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1961": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "ZSJSoucBod":{"label": "Část obce 1961","color":blueColor, "checked": true},  
        "obceSouc":{"label": "Obce 1961","color":darkgreenColor, "checked": false},
        "ZSJPol":{"label": "Struktura obce 1961","color":lightgreenColor, "checked": false},
        "soudOkresy":{"label":"Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1970": {
        "ORP": {"label":"Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "ZSJSoucBod": {"label":"Část obce 1970","color":blueColor, "checked": true},  
        "castObcPol":{"label": "Základní sídelní jednotky 1970","color":greenyellow, "checked": false},
        "obceSouc":{"label": "Obce 1970","color":darkgreenColor, "checked": false},
        "ZSJPol":{"label": "Struktura obce 1970","color":lightgreenColor, "checked": false},
        "soudOkresy": {"label":"Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1980": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "ZSJSoucBod":{"label": "Část obce 1980","color":blueColor, "checked": false},  
        "castObcPol": {"label":"Základní sídelní jednoty 1980","color":greenyellow, "checked": true},
        "obceSouc":{"label": "Obce 1980","color":darkgreenColor, "checked": false},
        "ZSJPol": {"label":"Struktura obce 1980","color":lightgreenColor, "checked": false},
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    },
    "1991": {
        "ORP":{"label": "Obce s rozšířenou působností 2021","color":redColor, "checked": false},
        "POU":{"label": "Obce s pověřeným obecním úřadem 2021","color":greyColor, "checked": false},
        "obceSouc": {"label":"Obce 1991","color":darkgreenColor, "checked": false},
        "ZSJSoucBod": {"label":"Část obce 1991","color":blueColor, "checked": true},  
        "castObcPol":{"label": "Základní sídelní jednoty 1991","color":lightgreenColor, "checked": false},
        "ZSJPol":{"label": "Struktura obce 1980", "color":greenyellow, "checked": false},       
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
     },
    "2021": {
        "ORP": {"label":"Obce s rozšířenou působností","color":redColor, "checked": false},
        "POU": {"label":"Obce s pověřeným obecním úřadem","color":greyColor, "checked": false},
        "katSoucPol":{"label": "Katastrální území 2021","color":greenColor, "checked": false},
        "ZSJSoucBod":{"label": "Prostranství 2021","color":greenyellow, "checked": false},
        "castObcPol": {"label":"Části obcí 2021","color":blueColor, "checked": true},  
        "ZSJPol": {"label":"Základní sídelní jednotky 2021","color":lightgreenColor, "checked": false},
        "obceSouc": {"label":"Obce 2021","color":darkgreenColor, "checked": false},
        "soudOkresy":{"label": "Soudní okresy 1946",  "color":brownColor, "checked": false},
    }
}


const yearsOptionsDataList = {
    "1910": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1921": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1930": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1939": {
        "0": "Vyberte modul",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1946": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1947": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
    },
    "1949": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1950": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1961": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
    },
    "1970": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1980": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1991": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
    },
    "2021": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    }
}

const yearsFilterDataList = {
    "1910": {
        "0": "Vyberte modul",
        "rozloha": "Výměra katastrálního území",
        "přítomn": "Přítomné obyvatelstvo",
        "obcovací": "Německá obcovací řeč domácího obyvatelstva",
        "obcovac_1": "Česká obcovací řeč domácího obyvatelstva",
        "cizozemci": "Cizinci"
    },
    "1921": {
        "0": "Vyberte modul",
        "rozloha": "Výměra katastrálního území",
        "přítomn": "Přítomné obyvatelstvo",
        "německá": "Německá národnost",
        "česká_n": "Československá národnost",
        "jiná_nár": "Jiná národnost"
    },
    "1930": {
        "0": "Vyberte modul",
        "rozloha": "Výměra katastrálního území",
        "přítomn": "Přítomné obyvatelstvo",
        "národnost": "Německá národnost",
        "národno_1": "Československá národnost",
        "národno_2": "Jiná národnost",
        "cizozemci": "Cizozemci"
    },
    "1939": {
        "0": "Vyberte modul",
        "rozloha": "Výměra katastrálního území",
        "přítomn": "Přítomné obyvatelstvo",
        "německá": "Německá národnost",
        "česká_n": "Československá národnost",
        "jiná_nár": "Jiná národnost"
    },
    "1946": {
        "0": "Vyberte modul",        
        "přítomn": "Přítomné obyvatelstvo",
        "německá": "Německá národnost",
        "česká_n": "Česká národnost",
        "slovenská": "Slovenská národnost",
        "jiná_nár": "Jiná národnost"
    },
    "1947": {
        "0": "Vyberte modul",
        "přítomn": "Přítomné obyvatelstvo",
        "německá": "Německá národnost",
        "česká_n": "Česká národnost"
    },
    "1949": {
        "0": "Vyberte modul",
        "přítomn": "Počet Přítomných obyvatel",
        "výměra": "Výměra lokality"
    },
    "1950": {
        "0": "Vyberte modul",
        "plocha_obc": "Plocha obce",
        "počet_dom": "Domy",
        "přítomn": "Přítomné obyvatelstvo",
        "česká": "Česká národnost",
        "německá": "Německá národnost",
        "slovenská": "Slovenská národnost",
        "ruská": "Ruská národnost",
        "polská": "Polská národnost",
        "bulharská": "Bulharská národnost",
        "srbo_chorv": "Srbo-chorvatská národnost",
        "maďarská": "Maďarská národnost",
        "židovská": "Židovská národnost",
        "romská": "Romská národnost",
        "neudaná_n": "Neudaná národnost"
    },
    "1961": {
        "0": "Vyberte modul",
        "plocha_obc": "Plocha obce",
        "počet_dom": "Trvale obydlené domy",
        "počet_oby": "Počet obyvatel",
        "česká": "Česká národnost",
        "německá": "Německá národnost",
        "slovenská": "Slovenská národnost",
        "ruská_a_u": "Ruská a ukrajinská národnost",
        "polská": "Polská národnost",
        "bulharská": "Bulharská národnost",
        "srbo_chorv": "Srbo-chorvatská národnost",
        "maďarská": "Maďarská národnost",
        "jiná": "Jiná národnost",
        "neudaná": "Neudaná národnost"
    },
    "1970": {
        "0": "Vyberte modul",
        "plocha_obc": "Plocha obce",
        "počet_dom": "Trvale obydlené domy",
        "počet_oby": "Počet obyvatel",
        "česká": "Česká národnost",
        "německá": "Německá národnost",
        "slovenská": "Slovenská národnost",
        "ruská": "Ruská národnost",
        "polská": "Polská národnost",        
        "maďarská": "Maďarská národnost",
        "ukrajinsk": "Ukrajinská národnost",
        "jiná": "Jiná národnost",
        "neudaná": "Neudaná národnost"
    },
    "1980": {
        "0": "Vyberte modul",
        "plocha_obc": "Plocha obce",
        "počet_dom": "Trvale obydlené domy",
        "počet_oby": "Počet obyvatel",
        "česká": "Česká národnost",
        "německá": "Německá národnost",
        "slovenská": "Slovenská národnost",
        "ruská": "Ruská národnost",
        "polská": "Polská národnost",
        "maďarská": "Maďarská národnost",
        "ukrajinsk": "Ukrajinská národnost",
        "jiné": "Jiná národnost",
        "neudaná": "Neudaná národnost"
    },
    "1991": {
        "0": "Vyberte modul",
        "rozloha_ob": "Plocha obce",
        "domy___dom": "Trvale obydlené domy",
        "počet_oby": "Počet obyvatel",
        "česká": "Česká národnost",
        "německá": "Německá národnost",
        "slovenská": "Slovenská národnost",
        "moravská": "Moravská národnost",
        "slezská": "Slezská národnost",
        "ruská": "Ruská národnost",
        "polská": "Polská národnost",        
        "maďarská": "Maďarská národnost",
        "ukrajinsk": "Ukrajinská národnost",
        "romská": "Romská národnost",
        "ostatní": "Ostatní národnost",
        "nezjiště": "Nezjištěná národnost",
        "neudaná": "Neudaná národnost"
     },
    // "2021": {
    //     "0": "Vyberte modul",
    //     "početobyv": "Počet trvalých obyvatel 2021",
    //     "početob_1": "Počet obvyklých obyvatel 2021",
    //     "početbudo": "Počet budov s čísly 2021",
    //     "národno_1": "Národnost 2021 – česká",
    //     "národnost": "Národnost 2021 - německá",
    //     "národno_2": "Národnost 2021 - moravská",
    //     "národno_3": "Národnost 2021 - slezská",
    //     "národno_4": "Národnost 2021 - slovenská",
    //     "národno_5": "Národnost 2021 - polská",
    //     "národno_6": "Národnost 2021 - romská",
    //     "národno_8": "Národnost 2021 - ruská",
    //     "národno_9": "Národnost 2021 - ukrajinská",
    //     "národno_10": "Národnost 2021 - vietnamská"
    //árodno_6": "Národnost 2021 - romská",
    //     "národno_8": "Národnost 2021 - ruská",
    //     "národno_9": "Národnost 2021 - ukrajinská",
    //     "národno_10": "Národnost 2021 - vietnamská
    // }
}