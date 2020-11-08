import ComboBox from "./ComboBox"

class KeywordComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/KeywordIndex"
	getNewFieldURL = () => "/prak/input/keyword"

	labelPostfix = () => " (Rejstřík klíčových slov)"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default KeywordComboBox