import React from 'react'

import { TextField } from '@material-ui/core'

/**
 * TextField parsing date to standartizet format
 */
class DateField extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: undefined,
            error: false,
        }

        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * Runs automatic validation
     * @param  {String} category Category name
     */
    handleChange(event) {
        const value = event.target.value
        const regex = /^(?:\d{1,2}\.){0,2}\d{4}$/
        let state = {}
        let newDate = undefined

        if (value.length === 0) {
            this.setState({ value: undefined, error: false })
            if (this.props.onChange) this.props.onChange(event)
            return
        }

        if (!regex.test(value)) {
            this.setState({ value, error: true })
            return
        }
        // parse czech date format of various length
        const sd = value.split('.')
        switch (sd.length) {
            case 1:
                newDate = new Date(value)
                break
            case 2:
                newDate = new Date(`${sd[0]}-1-${sd[1]}`)
                break
            case 3:
                newDate = new Date(`${sd[1]}-${sd[0]}-${sd[2]}`)
                break
            default:
        }

        if (newDate instanceof Date && !isNaN(newDate))
            state = { value, error: false }
        else state = { value, error: true }

        this.setState(state)

        if (this.props.onChange)
            this.props.onChange({
                ...event,
                target: { ...event.target, value: newDate },
            })
    }

    render() {
        const { errorMessage, defaultValue, ...config } = this.props

        let parsedDefaultValue = ''
        if (defaultValue) {
            const parsedDate = new Date(defaultValue)
            parsedDefaultValue = parsedDate
                .toLocaleDateString('cs-CZ', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                })
                .split(' ')
                .join('')
        }

        return (
            <TextField
                {...config}
                defaultValue={parsedDefaultValue}
                onChange={this.handleChange}
                error={this.state.error}
                helperText={
                    this.state.error
                        ? errorMessage ||
                          'Invalid Date, use format dd.mm.yyyy or mm.yyyy or yyyy'
                        : ''
                }
            />
        )
    }
}

export default DateField
