import React from "react";

import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";

class StaticComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
        ? this.props.defaultValue
        : this.props.options
        ? this.props.options[0] || ""
        : "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });

    if (this.props.onChange) this.props.onChange(event);
  }

  render() {
    return (
      <FormControl style={{ width: "100%" }} variant={this.props.variant}>
        <InputLabel id="select-label">
          {this.props.label[0].toUpperCase() + this.props.label.slice(1)}
        </InputLabel>
        <Select
          name={this.props.name}
          labelId="select-label"
          label={this.props.label[0].toUpperCase() + this.props.label.slice(1)}
          required={this.props.required}
          onChange={this.handleChange}
          value={this.state.value}
          style={{ width: "100%" }}
          inputProps={{
            realvalue: this.state.ID,
          }}
          endAdornment={
            this.props.InputProps && this.props.InputProps.endAdornment
              ? this.props.InputProps.endAdornment
              : undefined
          }
        >
          {this.props.options !== undefined &&
            this.props.options.map((value, key) => (
              <MenuItem key={key} value={value}>
                {value === "" ? "-----" : value}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }
}

export default StaticComboBox;
