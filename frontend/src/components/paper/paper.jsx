import React from "react"

import styles from "./paper.module.scss"

class Paper extends React.Component {
	render(){
		const classNames = [
			this.props.className,
			styles.paper,
		]
		return(
			<div className={classNames.join(" ")}>
				{this.props.children}
			</div>
		)
	}
}

export default Paper
