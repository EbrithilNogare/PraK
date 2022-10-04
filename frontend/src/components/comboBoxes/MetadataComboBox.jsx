import ComboBox from './ComboBox'

class MetadataComboBox extends ComboBox {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.defaultValue
                ? this.parseReturnedObjectFromMongooseFind(
                      this.props.defaultValue
                  ) || ''
                : '',
            name: '',
            ID: this.props.defaultValue ? 1 : '',
            menuList: [],
            loading: false,
        }
    }
    getFetchURL = () => '/prak/api/Metadata'
    getNewFieldURL = () => '/prak/input/metadata'

    labelPostfix = () => ' (Metadata)'

    generateObjectForMongooseFind = (value) => {
        return { name: `/${value}/` }
    }

    parseReturnedObjectFromMongooseFind = (element) => element.name
}

export default MetadataComboBox
