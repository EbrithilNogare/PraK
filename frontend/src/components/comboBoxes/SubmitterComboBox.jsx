import React from 'react'
import { withCookies } from 'react-cookie'

import { TextField } from '@material-ui/core'

class SubmitterComboBox extends React.Component {
    constructor(props) {
        super(props)
        this.defaultValue = this.props.cookies.get('user') || ''
    }

    componentDidMount() {
        if (!this.props.defaultValue)
            this.props.onChange({ target: { value: this.defaultValue } })
    }

    render() {
        const { defaultValue, allCookies, ...childProps } = { ...this.props }
        return (
            <TextField
                {...childProps}
                defaultValue={defaultValue ? defaultValue : this.defaultValue}
                disabled={!(this.props.cookies.get('permission') & 1)}
            />
        )
    }
}

export default withCookies(SubmitterComboBox)
