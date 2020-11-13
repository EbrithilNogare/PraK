import ComboBox from "./ComboBox"

class CreationComboBox extends ComboBox {
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
	getFetchURL = () => "/prak/api/CreationIndex"
	getNewFieldURL = () => "/prak/input/creation"

	labelPostfix = () => " (Rejstřík dílo/výtvor)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default CreationComboBox