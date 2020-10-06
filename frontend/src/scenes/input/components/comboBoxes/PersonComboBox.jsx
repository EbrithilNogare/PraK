import ComboBox from "./ComboBox"

class PersonComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/personIndex"

	generateObjectForMongooseFind = (value) => {
		return {surname: `/${value}/`}
	}
	
	parseReturnedObjectFromMongooseFind = (element) =>
		`${element.surname.join(" ")} ${element.name.join(" ")}`
}

export default PersonComboBox