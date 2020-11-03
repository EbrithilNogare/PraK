import React from "react"

import {
	Paper,
} from '@material-ui/core'

import styles from "./manualPage.module.scss"


class ManualPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {}
	}

	render(){
		return(
			<Paper className={styles.root}>
				<h1>Manual pro praci se zadavatkem </h1>
				<p>
					just do it
				</p>
			</Paper>
		)
	}
}

export default ManualPage