import ComboBox from "./ComboBox"

class GeographicComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/GeographicIndex"
	getNewFieldURL = () => "/prak/input/geographic"

	labelPostfix = () => " (Geografický rejstřík)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default GeographicComboBox