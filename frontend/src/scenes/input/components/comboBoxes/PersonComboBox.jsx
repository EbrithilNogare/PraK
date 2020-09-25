import FetchComboBox from "./FetchComboBox"

class PersonComboBox extends FetchComboBox {
	getFetchURL = () => "/prak/api/PeopleIndex"

	generateObjectForMongooseFind = (value) => {
		return {surname: `/${value}/`}
	}
	
	parseReturnedObjectFromMongooseFind = (element) =>
		`${element.surname.join(" ")} ${element.name.join(" ")}`
}

export default PersonComboBox