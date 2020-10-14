import ComboBox from "./ComboBox"

class SubjectComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/SubjectIndex"
	getNewFieldURL = () => "/prak/input/subject"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default SubjectComboBox