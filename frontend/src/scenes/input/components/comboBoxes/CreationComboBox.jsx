import ComboBox from "./ComboBox"

class CreationComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/CreationIndex"
	getNewFieldURL = () => "/prak/input/creation"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default CreationComboBox