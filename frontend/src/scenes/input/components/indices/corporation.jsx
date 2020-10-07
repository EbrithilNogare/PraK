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

class Corporation extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}	
		this.indexURL = "corporation"
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
					<h1>Nový záznam do Korporátního rejstříku</h1>
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
					<TextField name="acronym" label="Akronym/zkratka"/><br/>
					<TextField name="historical_name" label="Historická/dřívější forma jména"/><br/>
					<TextField name="other_name_form" label="Jiné označení"/><br/>
					<TextField name="following_name" label="Následující forma jména"/><br/>
				</Paper>
				
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField name="main_part" label="Hlavní část"/>
					<TextField name="side_part" label="Vedlejší část"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField name="general_complement" label="Obecný doplněk"/>
					<TextField name="geographical_complement" label="Geografický doplněk"/>
					<TextField name="chronological_complement" label="Chronologický doplněk"/>
					<TextField name="brief_characteristic" label="Stručná charakteristika"/>
					<TextField name="history" label="Historie"/>
					<TextField name="function" label="Funkce"/>
					<TextField name="constitutive_standards" label="Normy konstitutivní"/>
					<TextField name="scope_standards" label="Normy - působnost původce"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<GPSField name="coordinates" label="Souřadnice"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<CorporationComboBox name="parent_corporation" label="Nadřízená korporace"/>
					<CorporationComboBox name="part_of" label="Je část"/>
					<CorporationComboBox name="precedent_corporation" label="Zahrnuta v korporaci"/>
					<GeographicComboBox name="related_country" label="Související země"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vznik/ počátek existence</h2>
					<PersonComboBox name="founder" label="Zřízení, založení zakladatel"/>
					<CreationComboBox name="founding_document" label="Ustanovující dokument"/>
					<GeographicComboBox name="founding_place" label="Geografický objekt v roli předchůdce"/>
					<CreationComboBox name="registration_subject" label="Zapsání díla"/>
					<SubjectComboBox name="registration_event" label="Událost"/>
					<PersonComboBox name="cleavage_person" label="Odštěpení evidence existence - osoba"/>
					<CreationComboBox name="cleavage_document" label="Ustanovující dokument"/>
					<GeographicComboBox name="cleavage_place" label="Geografický objekt v roli předchůdce"/>
					<TextField name="chronological_specification_beginning" label="Chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox name="cancellation_person" label="Zrušení, likvidace, rozpuštění osoba/bytost která se podílela na zániku"/>
					<CreationComboBox name="cancellation_document" label="Související dokument"/>
					<GeographicComboBox name="cancellation_place" label="Geografický objekt jako následník"/>
					<CreationComboBox name="delete_from_evidence_subject" label="Výmaz z evidence dilo/vytvor"/>
					<SubjectComboBox name="delete_from_evidence_event" label="Událost"/>
					<TextField name="chronological_specification_cancellation" label="Chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Událost</h2>
					<CorporationComboBox name="owner_change" label="Změna majitele, držitele"/>
					<GeographicComboBox name="place_change" label="Přesun na jiné místo"/>
					<CorporationComboBox name="organisation_inclusion" label="Organizační začlenění"/>
					<CorporationComboBox name="change_parent_organisation" label="Změna nadřazené organizace"/>
					<CreationComboBox name="award" label="Ocenění"/>
					<SubjectComboBox name="event_award" label="Udělení ocenění"/>
					<PersonComboBox name="awarder_person" label="Udělovatel_Osoba"/>
					<CorporationComboBox name="awarder_corporation" label="Udělovatel_Korporace"/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox name="category" label="Zařazení"/>
					<GeographicComboBox name="domain_scope" label="Obor působnosti"/>
					<KeywordComboBox name="geographical_scope" label="Geografická působnosti"/>
					<KeywordComboBox name="characteristic" label="Charakteristika"/>
					<TextField name="logo" label="Logo"/>
					<TextField name="mark" label="Značka"/>
					<TextField name="flag" label="Vlajka"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField name="" label="Poznámky"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField name="" label="Zdroje o heslu"/>
				</Paper>					
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Corporation))