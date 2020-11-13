import ComboBox from "./ComboBox"

class SubjectComboBox extends ComboBox {
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
	getFetchURL = () => "/prak/api/SubjectIndex"
	getNewFieldURL = () => "/prak/input/subject"

	labelPostfix = () => " (Rejstřík událostí)"

	generateObjectForMongooseFind = (value) => {
		return { name_main_part: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name_main_part
}

export default SubjectComboBox