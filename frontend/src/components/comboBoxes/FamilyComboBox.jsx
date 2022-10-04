import ComboBox from './ComboBox'

class FamilyComboBox extends ComboBox {
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
    getFetchURL = () => '/prak/api/FamilyIndex'
    getNewFieldURL = () => '/prak/input/family'

    labelPostfix = () => ' (Rejstřík rodů)'

    generateObjectForMongooseFind = (value) => {
        return { other_source: { name: `/${value}/` } }
    }

    parseReturnedObjectFromMongooseFind = (element) => element.other_source.name
}

export default FamilyComboBox
