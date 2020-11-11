import ComboBox from "./ComboBox"

class CreationComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/CreationIndex"
	getNewFieldURL = () => "/prak/input/creation"

	labelPostfix = () => " (Rejstřík dílo/výtvor)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default CreationComboBox