import React from "react"

import "./Button.scss"

class Button extends React.Component {
	render(){
		return(
			<button className="Button">
				{this.props.children}
			</button>
		)
	}
}

export default Button
