import ComboBox from "./ComboBox"

class FamilyComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/FamilyIndex"
	getNewFieldURL = () => "/prak/input/family"

	labelPostfix = () => " (Restřík rodů)"

	generateObjectForMongooseFind = (value) => {
		return { other_source: { name: `/${value}/` } }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.other_source.name
}

export default FamilyComboBox