import React from "react"

import "./ProgressBar.scss"

class ProgressBar extends React.Component {
	render(){
		return(
			<div className="ProgressBar">
				<div className="pointer"></div>
			</div>
		)
	}
}

export default ProgressBar