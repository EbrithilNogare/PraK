import React from 'react'
import { TextField } from '@material-ui/core'

/**
 * Textfield that checks that value is unique against API
 */
class UniqueTextField extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unique: true,
        }

        this.request_v = 0
        this.newestRequest_v = 0
    }

    handleChange = (e) => {
        if (e.target.value === this.props.defaultValue) return

        const url = `/prak/api/${this.props.uniqueSource}`

        const thisRequestVesion = this.request_v++

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [this.props.uniqueField]: e.target.value }),
        })
            .then((response) => {
                if (thisRequestVesion < this.newestRequest_v)
                    Promise.reject(`Old request version: ${thisRequestVesion}`)
                this.newestRequest_v = thisRequestVesion
                return response.json()
            })
            .then((data) => {
                if (data.length > 0) {
                    this.setState({ unique: false })
                } else {
                    this.setState({ unique: true })
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })

        if (this.props.onChange) this.props.onChange(e)
    }

    render() {
        const { uniqueSource, uniqueField, ...props } = { ...this.props }
        return (
            <TextField
                {...props}
                onChange={this.handleChange}
                error={!this.state.unique || props.error}
                helperText={
                    (props.helperText || '') +
                    (this.state.unique ? '' : 'Duplicita')
                }
            />
        )
    }
}

export default UniqueTextField
