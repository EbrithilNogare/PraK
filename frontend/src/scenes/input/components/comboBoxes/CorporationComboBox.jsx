import FetchComboBox from "./FetchComboBox"

class CorporationComboBox extends FetchComboBox {
	getFetchURL = () => "/prak/api/CorporationIndex"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default CorporationComboBox