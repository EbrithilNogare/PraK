import ComboBox from "./ComboBox"

class SubjectComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/SubjectIndex"
	getNewFieldURL = () => "/prak/input/subject"

	labelPostfix = () => " (Rejstřík událostí)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default SubjectComboBox