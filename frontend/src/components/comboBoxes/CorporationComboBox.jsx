import ComboBox from "./ComboBox"

class CorporationComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/CorporationIndex"
	getNewFieldURL = () => "/prak/input/corporation"

	labelPostfix = () => " (Rejstřík korporací)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default CorporationComboBox