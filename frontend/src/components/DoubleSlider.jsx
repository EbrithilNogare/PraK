import React from 'react'

import { Typography, Grid, TextField, Slider } from '@material-ui/core'

/**
 * Slider, but with two slider defining from and to value
 */
class DoubleSlider extends React.Component {
    constructor(props) {
        super(props)

        let defaultValue = this.props.defaultValue
        if (
            !defaultValue ||
            !defaultValue.every((value) => value !== undefined)
        )
            defaultValue = [this.props.min, this.props.max]

        this.state = {
            value: defaultValue,
        }

        this.handleDoubleChange = this.handleDoubleChange.bind(this)
        this.handleChangeBegin = this.handleChangeBegin.bind(this)
        this.handleChangeEnd = this.handleChangeEnd.bind(this)
    }

    handleDoubleChange(e, value) {
        this.setState({
            value: value,
        })

        if (this.props.onChange) {
            this.props.onChange({ ...e, target: { ...e.target, value: value } })
        }
    }

    handleChangeBegin(e) {
        this.setState({
            value: [e.target.value - 0, this.state.value[1]],
        })

        if (this.props.onChange) {
            this.props.onChange({
                ...e,
                target: { ...e.target, value: this.state },
            })
        }
    }

    handleChangeEnd(e) {
        this.setState({
            value: [this.state.value[0], e.target.value - 0],
        })

        if (this.props.onChange) {
            this.props.onChange({
                ...e,
                target: { ...e.target, value: this.state },
            })
        }
    }

    render() {
        return (
            <div>
                <Typography id="range-slider" gutterBottom>
                    {this.props.label}
                </Typography>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item>
                        <TextField
                            label={this.props.BeginLabel || 'begin'}
                            type="number"
                            value={this.state.value[0]}
                            style={{ width: '60px' }}
                            onChange={this.handleChangeBegin}
                        />
                    </Grid>
                    <Grid item xs>
                        <Slider
                            onChange={this.handleDoubleChange}
                            value={this.state.value}
                            valueLabelDisplay="auto"
                            min={this.props.min | 0}
                            max={this.props.max | 100}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label={this.props.EndLabel || 'end'}
                            type="number"
                            value={this.state.value[1]}
                            style={{ width: '60px' }}
                            onChange={this.handleChangeEnd}
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default DoubleSlider
