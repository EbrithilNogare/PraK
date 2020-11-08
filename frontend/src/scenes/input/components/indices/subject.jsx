import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import {
	TextField,
	Button,
	Paper,
} from '@material-ui/core'

import {
	CorporationComboBox,
	CreationComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../comboBoxes'

import IndexParent from "./indexParent"

import styles from './parent.module.scss'
//import GPSField from "../validationTextFields/GPSField"

class Subject extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "subject"
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					<h1>Nový záznam do Rejstříku událostí</h1>
				</Paper>
				<div className={styles.body}>
					<Paper className={styles.dataBlock}>
						<h2>Jiný zdroj</h2>
						<TextField label="Název" onChange={e=>{this.handleFormChange(e, "other_source.name")}}/>
						<TextField label="ID" onChange={e=>{this.handleFormChange(e, "other_source.id")}}/>
						<TextField label="Identifikátor hesla" onChange={e=>{this.handleFormChange(e, "other_source.identificator")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Název</h2>
						<TextField required label="Název" onChange={e=>{this.handleFormChange(e, "name")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Variantní označení</h2>
						<TextField label="Akronym/zkratka" onChange={e=>{this.handleFormChange(e, "acronym")}}/><br/>
						<TextField label="Jiné označení" onChange={e=>{this.handleFormChange(e, "other_name_form")}}/><br/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Části označení</h2>
						<TextField label="Hlavní část" onChange={e=>{this.handleFormChange(e, "main_part")}}/>
						<TextField label="Další část" onChange={e=>{this.handleFormChange(e, "other_part")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Doplňky označení</h2>
						<TextField label="Obecný doplněk" onChange={e=>{this.handleFormChange(e, "general_complement")}}/>
						<TextField label="Geografický doplněk" onChange={e=>{this.handleFormChange(e, "geographical_complement")}}/>
						<TextField label="Chronologický doplněk" onChange={e=>{this.handleFormChange(e, "chronological_complement")}}/>
						<TextField label="Pořadí údálosti" onChange={e=>{this.handleFormChange(e, "event_order")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Popis</h2>
						<TextField required label="Popis" onChange={e=>{this.handleFormChange(e, "description")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Vztahy</h2>
						<SubjectComboBox label="Souborná událost, celek" onChange={e=>{this.handleFormChange(e, "aggregate_event")}}/>
						<SubjectComboBox label="Podřazená událost" onChange={e=>{this.handleFormChange(e, "sub_event")}}/>
						<PersonComboBox label="Spojená entita" onChange={e=>{this.handleFormChange(e, "related_person")}}/>
						<CreationComboBox label="Spojená entita" onChange={e=>{this.handleFormChange(e, "related_subject")}}/>
						<GeographicComboBox label="Spojená entita" onChange={e=>{this.handleFormChange(e, "related_place")}}/>
						<GeographicComboBox label="Místo konání" onChange={e=>{this.handleFormChange(e, "venue")}}/>
						<PersonComboBox label="Organizátor, svolovatel" onChange={e=>{this.handleFormChange(e, "organizator_person")}}/>
						<CorporationComboBox label="Organizátor, svolovatel" onChange={e=>{this.handleFormChange(e, "organizator_corporation")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Počátek existence</h2>
						<PersonComboBox label="Vznik" onChange={e=>{this.handleFormChange(e, "founding_person")}}/>
						<CorporationComboBox label="Vznik" onChange={e=>{this.handleFormChange(e, "founding_corporation")}}/>
						<GeographicComboBox label="První písemná zmínka" onChange={e=>{this.handleFormChange(e, "first_mention_place")}}/>
						<CreationComboBox label="První písemná zmínka" onChange={e=>{this.handleFormChange(e, "first_mention")}}/>
						<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "founding_chronological_specification")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Konec existence</h2>
						<PersonComboBox label="Zničení, zánik" onChange={e=>{this.handleFormChange(e, "cancellation_person")}}/>
						<CorporationComboBox label="Zničení, zánik" onChange={e=>{this.handleFormChange(e, "cancellation_event")}}/>
						<GeographicComboBox label="Poslední zmínka" onChange={e=>{this.handleFormChange(e, "last_mention_place")}}/>
						<CreationComboBox label="Poslední písemná zmínka" onChange={e=>{this.handleFormChange(e, "last_mention")}}/>
						<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "cancellation_chronological_specification")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zařazení</h2>
						<KeywordComboBox label="Kategorie" onChange={e=>{this.handleFormChange(e, "category")}}/>
						<KeywordComboBox label="Téma" onChange={e=>{this.handleFormChange(e, "topic")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Poznámky</h2>
						<TextField label="Poznámky" onChange={e=>{this.handleFormChange(e, "notes")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zdroje o heslu</h2>
						<TextField label="Zdroje o heslu" onChange={e=>{this.handleFormChange(e, "record_sources")}}/>
					</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Subject))