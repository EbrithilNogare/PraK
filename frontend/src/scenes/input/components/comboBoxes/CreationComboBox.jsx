import ComboBox from "./ComboBox"

class CreationComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/CreationIndex"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default CreationComboBox