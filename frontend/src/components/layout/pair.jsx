import React from "react"

import styles from "./pair.module.scss"

export default class Pair extends React.Component {
	render(){
		const classNames = [
			this.props.className,
			styles.pair,
		]
		return(
			<div className={classNames.join(" ")}>
				{this.props.children}
			</div>
		)
	}
}
