import ComboBox from "./ComboBox"

class PersonComboBox extends ComboBox {
	constructor(props){
		super(props)

		this.state = {
			value: this.props.defaultValue ? this.parseReturnedObjectFromMongooseFind(this.props.defaultValue) : "",
			name: "",
			ID: this.props.defaultValue ? 1 : "",
			menuList: [],
			loading: false,
		}
	}
	getFetchURL = () => "/prak/api/personIndex"
	getNewFieldURL = () => "/prak/input/person"

	labelPostfix = () => " (Rejstřík osob)"

	generateObjectForMongooseFind = (value) => {
		return { _nameAndSurname: value }
	}

	parseReturnedObjectFromMongooseFind = (element) => {
		if(!element.surname || !element.name){
			console.warn("missing name in parseReturnedObjectFromMongooseFind(element)", element)
			return ""
		}
		return `${element.surname} ${element.name}`
	}
}

export default PersonComboBox