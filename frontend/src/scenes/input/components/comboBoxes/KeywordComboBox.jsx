import ComboBox from "./ComboBox"

class KeywordComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/KeywordIndex"
	getNewFieldURL = () => "/prak/input/keyword"

	labelPostfix = () => " (Rejstřík klíčových slov)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default KeywordComboBox