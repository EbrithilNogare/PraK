import ComboBox from "./ComboBox"

class GeographicComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/GeographicIndex"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default GeographicComboBox