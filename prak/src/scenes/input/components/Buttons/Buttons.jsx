import React from "react"

import Button from "components/button"

import "./Buttons.scss"

class Buttons extends React.Component {
	render(){
		return(
			<div className="Buttons">
				<Button>Save</Button>
				<Button>Send</Button>
			</div>
		)
	}
}

export default Buttons