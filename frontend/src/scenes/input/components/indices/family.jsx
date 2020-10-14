import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import {
	TextField,
	Button,
	Paper,
} from '@material-ui/core'

import {
//	CorporationComboBox,
//	CreationComboBox,
//	GeographicComboBox,
//	KeywordComboBox,
//	PersonComboBox,
//	SubjectComboBox,
} from '../comboBoxes'

import IndexParent from "./indexParent"

import styles from './parent.module.scss'

class Family extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "family"
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					<h1>Nový záznam do Rejstříku rodů</h1>
				</Paper>
				<div className={styles.body}>
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField label="Název" onChange={e=>{this.handleFormChange(e, "other_source.name")}}/>
					<TextField label="ID" onChange={e=>{this.handleFormChange(e, "other_source.id")}}/>
					<TextField label="Identifikátor hesla" onChange={e=>{this.handleFormChange(e, "other_source.identificator")}}/>
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Family))