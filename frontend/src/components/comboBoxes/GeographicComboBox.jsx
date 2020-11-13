import ComboBox from "./ComboBox"

class GeographicComboBox extends ComboBox {
	constructor(props){
		super(props)
		
		this.state = {
			value: this.props.defaultValue ? this.parseReturnedObjectFromMongooseFind(this.props.defaultValue) || "" : "",
			name: "",
			ID: this.props.defaultValue ? 1 : "",
			menuList: [],
			loading: false,
		}
	}
	getFetchURL = () => "/prak/api/GeographicIndex"
	getNewFieldURL = () => "/prak/input/geographic"

	labelPostfix = () => " (Geografický rejstřík)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default GeographicComboBox