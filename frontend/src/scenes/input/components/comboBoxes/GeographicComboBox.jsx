import ComboBox from "./ComboBox"

class GeographicComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/GeographicIndex"
	getNewFieldURL = () => "/prak/input/geographic"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default GeographicComboBox