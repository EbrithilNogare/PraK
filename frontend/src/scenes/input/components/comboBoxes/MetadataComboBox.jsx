import ComboBox from "./ComboBox"

class MetadataComboBox extends ComboBox {
	getFetchURL = () => "/prak/api/Metadata"
	getNewFieldURL = () => "/prak/input/metadata"

	generateObjectForMongooseFind = (value) => {
		return { name: `/${value}/` }
	}
	
	parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default MetadataComboBox