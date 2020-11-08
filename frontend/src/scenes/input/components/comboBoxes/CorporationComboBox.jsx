import ComboBox from "./ComboBox"

class CorporationComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/CorporationIndex"
	getNewFieldURL = () => "/prak/input/corporation"

	labelPostfix = () => " (Restřík korporací)"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default CorporationComboBox