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
        layersGridEl.innerHTML += `
        <div class="mui-checkbox">
			<label>
				<input type="checkbox" id="${property}">
				${selectedYearData[property]}
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
const yearsInputsDataList = {
    "1910": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "katSoucPol": "Osady 1910",
        "ZSJSoucBod": "Část osady 1910",
        "castObcPol": "Katastry 1910",        
        "obceSouc": "Obce 1910",
        "ZSJPol": "Příslušnost"
        
    },
    "1921": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "katSoucPol": "Osady 1921",
        "ZSJSoucBod": "Část osady 1921",
        "castObcPol": "Katastry 1921",
        "obceSouc": "Obce 1921",
        "ZSJPol": "Příslušnost"
    },
    "1930": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "katSoucPol": "Osady 1930",
        "ZSJSoucBod": "Část osady 1930",
        "castObcPol": "Katastry 1930",
        "obceSouc": "Obce 1930",
        "ZSJPol": "Příslušnost"
    },
    "1939": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "katSoucPol": "Osady Protektorát 1939",        
        "obceSouc": "Obce Protektorát 1939",
        "ZSJPol": "Osady Župa 1939",        
        "castObcPol": "Obce Župa 1939"              
    },   
    "1946": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "obceSouc": "Obce 1946 Archivni soupis",
        "katSoucPol": "Obce 1946 Soupis obyvatel",
        "ZSJSoucBod": "Části obce 1946 Soupis obyvatel"
    },
    "1947": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "obceSouc": "Obce 1947",
        "ZSJPol": "Příslušnost"
    },
    "1949": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "obceSouc": "Obce 1949",
        "castObcPol": "Katastrální území 1949",
        "ZSJSoucBod": "Část obce 1949"
    },   
    "1950": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "katSoucPol": "Osady 1950",
        "obceSouc": "Obce 1950",
        "ZSJPol": "Příslušnost"
    },
    "1961": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "katSoucPol": "Osady 1961",
        "ZSJSoucBod": "Část osady 1961",
        "obceSouc": "Obce 1961",
        "ZSJPol": "Příslušnost"
    },
    "1970": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "ZSJSoucBod": "Část osady 1970",
        "castObcPol": "Základní sídelní jednotky 1970",
        "obceSouc": "Obce 1970",
        "ZSJPol": "Příslušnost"
    },
    "1980": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "ZSJSoucBod": "Část obce 1980",
        "castObcPol": "Základní sídelní jednoty 1980",
        "obceSouc": "Obce 1980",
        "ZSJPol": "Příslušnost"
    },
    "1991": {
        "ORP": "Obce s rozšířenou působností 2021",
        "POU": "Obce s pověřeným obecním úřadem 2021",
        "castObcPol": "Základní sídelní jednoty 1980"
    },
    "2021": {
        "ORP": "Obce s rozšířenou působností",
        "POU": "Obce s pověřeným obecním úřadem",
        "katSoucPol": "Katastrální území 2021",
        "ZSJSoucBod": "Prostranství 2021",
        "castObcPol": "Části obcí 2021",
        "ZSJPol": "Základní sídelní jednotky 2021",
        "obceSouc": "Obce 2021",
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
        "národnost": "Německá národnost",
        "národno_1": "Československá národnost",
        "národno_2": "Jiná národnost",
        "cizozemci": "Cizozemci"
    },
    "1946": {
        "0": "Vyberte modul",        
        "přítomn": "Přítomné obyvatelstvo",
        "národnost": "Německý mateřský jazyk",
        "česká_n": "Český mateřský jazyk",
        "jiná_nár": "Jiný mateřský jazyk"
    },
    "1947": {
        "0": "Vyberte modul",
        "přítomn": "Přítomné obyvatelstvo",
        "národnost": "Německý mateřský jazyk",
        "česká_n": "Český mateřský jazyk",
        "jiná_nár": "Jiný mateřský jazyk"
    },
    "1949": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "počet_o_1": "Počet obyvatel trvalých 2011",
        "počet_o_2": "Počet obyvatel obvyklých 2011"
    },
    "1950": {
        "0": "Vyberte modul",
        "plocha_obc": "Plocha obce",
        "počet_dom": "Trvale obydlené domy",
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
    "2021": {
        "0": "Vyberte modul",
        "početobyv": "Počet trvalých obyvatel 2021",
        "početob_1": "Počet obvyklých obyvatel 2021",
        "početbudo": "Počet budov s čísly 2021",
        "národno_1": "Národnost 2021 – česká",
        "národnost": "Národnost 2021 - německá",
        "národno_2": "Národnost 2021 - moravská",
        "národno_3": "Národnost 2021 - slezská",
        "národno_4": "Národnost 2021 - slovenská",
        "národno_5": "Národnost 2021 - polská",
        "národno_6": "Národnost 2021 - romská",
        "národno_8": "Národnost 2021 - ruská",
        "národno_9": "Národnost 2021 - ukrajinská",
        "národno_10": "Národnost 2021 - vietnamská"
    }
}