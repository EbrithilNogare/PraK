import ComboBox from "./ComboBox"

class PersonComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/personIndex"
	getNewFieldURL = () => "/prak/input/person"

	labelPostfix = () => " (Restřík osob)"

	generateObjectForMongooseFind = (value) => {
		return {surname: `/${value}/`}
	}
	
	parseReturnedObjectFromMongooseFind = (element) =>
		`${element.surname.join(" ")} ${element.name.join(" ")}`
}

export default PersonComboBox