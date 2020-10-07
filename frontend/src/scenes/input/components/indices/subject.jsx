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
import GPSField from "../validationTextFields/GPSField"

class Subject extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}	
		this.indexURL = "subject"
	}
	
	getDataReady = (elements) => {
		const data = {}
		const errors = []
		
		for(let element of elements)
			if(element.name && element.value !== ""){
				if(element.getAttribute("aria-invalid")==="true")
					errors.push(`Incorrect format of: ${element.name}`)
				data[element.name] = element.hasAttribute("realvalue") ? element.getAttribute("realvalue") : element.value
			}
		return {data, errors}
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.doubledataBlock}>
					<h1>Nový záznam do Rejstříku událostí</h1>
				</Paper>			
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField name="other_source-name" label="Název"/>
					<TextField name="other_source-id" label="ID"/>
					<TextField name="other_source-identificator" label="Identifikátor hesla"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Název</h2>
					<TextField required name="name" label="Název"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField name="acronym" label="Akronym/zkratka"/><br/>
					<TextField name="other_name_form" label="Jiné označení"/><br/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField name="main_part" label="Hlavní část"/>
					<TextField name="other_part" label="Další část"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField name="general_complement" label="Obecný doplněk"/>
					<TextField name="geographical_complement" label="Geografický doplněk"/>
					<TextField name="chronological_complement" label="Chronologický doplněk"/>
					<TextField name="event_order" label="Pořadí údálosti"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField required name="description" label="Popis"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<SubjectComboBox name="aggregate_event" label="Souborná událost, celek"/>
					<SubjectComboBox name="sub_event" label="Podřazená událost"/>
					<PersonComboBox name="related_person" label="Spojená entita"/>
					<CreationComboBox name="related_subject" label="Spojená entita"/>
					<GeographicComboBox name="related_place" label="Spojená entita"/>
					<GeographicComboBox name="venue" label="Místo konání"/>
					<PersonComboBox name="organizator_person" label="Organizátor, svolovatel"/>
					<CorporationComboBox name="organizator_corporation" label="Organizátor, svolovatel"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<PersonComboBox name="founding_person" label="Vznik_person"/>
					<CorporationComboBox name="founding_corporation" label="Vznik_corporation"/>
					<GeographicComboBox name="first_mention_place" label="První písemná zmínka_place"/>
					<CreationComboBox name="first_mention" label="První písemná zmínka"/>
					<TextField name="chronological_specification_beginning" label="Chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox name="cancellation_person" label="Zničení, zánik_person"/>
					<CorporationComboBox name="cancellation_event" label="Zničení, zánik_corporation"/>
					<GeographicComboBox name="last_mention_place" label="Poslední zmínka_place"/>
					<CreationComboBox name="last_mention" label="Poslední písemná zmínka"/>
					<TextField name="chronological_specification_end" label="Chronologické zpřesnění_end"/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox name="category" label="Kategorie"/>
					<KeywordComboBox name="topic" label="Téma"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField name="" label="Poznámky"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField name="" label="Zdroje o heslu"/>
				</Paper>					
				<Button type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Subject))