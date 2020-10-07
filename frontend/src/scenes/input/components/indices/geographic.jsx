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

import GPSField from "../validationTextFields/GPSField"

import styles from './parent.module.scss'

class Geographic extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}
		this.indexURL = "geographic"	
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
				<Paper className={styles.header}>
					<h1>Nový záznam do Geografického rejstříku</h1>
				</Paper>
				<div className={styles.body}>
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
						<TextField name="acronym" label="Akronym/zkratka"/>
						<TextField name="historical_name" label="Historická/dřívější forma jména"/>
						<TextField name="other_name_form" label="Jiný tvar jména/označení"/>
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
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Popis</h2>
						<KeywordComboBox name="brief_characteristic" label="Stručná charakteristika"/>
						<TextField name="description" label="Popis"/>
						<TextField name="history" label="Historie"/>
						<TextField name="" label="Elektronické umístění"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Souřadnice</h2>
						<GPSField name="coordinates" label="Souřadnice" errorMessage="Chybný formát souřadnic"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Vztahy</h2>
						<GeographicComboBox name="partner_object" label="Partnerský geografický objekt"/>
						<PersonComboBox name="owner" label="Majitelé"/>
						<h2>Zahrnuta v korporaci</h2>
						<CorporationComboBox name="corporation_name" label="Název"/>
						<PersonComboBox name="corporation_owner" label="Majitel"/>
						<h2>Spojená entita</h2>
						<PersonComboBox name="related_person" label="Spojená entita"/>
						<CreationComboBox name="related_subject" label="Spojená entita"/>
						<SubjectComboBox name="related_event" label="Spojená entita"/>
						<CorporationComboBox name="related_corporation" label="Spojená entita"/>
						<GeographicComboBox name="superordinate" label="Nadřazený"/>
						<GeographicComboBox name="subordinate" label="Podřazený"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Počátek existence</h2>
						<PersonComboBox name="founding_person" label="Vznik_person"/>
						<CorporationComboBox name="founding_corporation" label="Vznik_corporation"/>
						<CreationComboBox name="founding_document" label="Vznik_document"/>
						<GeographicComboBox name="founding_place" label="Vznik_place"/>
						<SubjectComboBox name="first_mention_event" label="První písemná zmínka_event"/>
						<CreationComboBox name="first_mention_subject" label="První písemná zmínka_subject"/>
						<GeographicComboBox name="first_mention_place" label="První písemná zmínka_place"/>
						<TextField name="chronological_specification_beginning" label="Chronologické zpřesnění"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Konec existence</h2>
						<PersonComboBox name="cancellation_person" label="Zánik_person"/>
						<CorporationComboBox name="cancellation_corporation" label="Zánik_corporation"/>
						<CreationComboBox name="cancellation_document" label="Zánik_document"/>
						<GeographicComboBox name="cancellation_place" label="Zánik_place"/>
						<SubjectComboBox name="last_mention_event" label="Poslední písemná zmínka_event"/>
						<CreationComboBox name="last_mention_subject" label="Poslední písemná zmínka_subject"/>
						<GeographicComboBox name="last_mention_place" label="Poslední písemná zmínka_place"/>
						<GeographicComboBox name="owner_change" label="Změna majitele, držitele"/>
						<TextField name="chronological_specification_cancellation" label="Chronologické zpřesnění"/>
						<TextField name="historical_milestones" label="Historické milníky"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Událost</h2>
						<CreationComboBox name="award" label="Ocenění"/>
						<SubjectComboBox name="event_award" label="Udělení ocenění"/>
						<PersonComboBox name="awarder_person" label="Udělovatel_person"/>
						<CorporationComboBox name="awarder_corporation" label="Udělovatel_corporation"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zařazení</h2>
						<KeywordComboBox name="category" label="Kategorie"/>
						<TextField name="characteristic" label="Charakteristika"/>
						<TextField name="arm" label="Erb"/>
						<TextField name="logo" label="Logo"/>
						<TextField name="mark" label="Značka"/>
						<TextField name="flag" label="Vlajka"/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Poznámky</h2>
						<TextField name="notes" multiline/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zdroje o heslu</h2>
						<TextField name="record_sources" multiline/>
					</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Geographic))