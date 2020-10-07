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
//	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../comboBoxes'

import IndexParent from "./indexParent"

import styles from './parent.module.scss'
import GenderComboBox from "../comboBoxes/GenderComboBox"
import FamilyComboBox from "../comboBoxes/FamilyComboBox"

class Person extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}	
		this.indexURL = "person"
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
					<h1>Nový záznam do Rejstříku osoby</h1>
				</Paper>
				<div className={styles.body}>			
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField name="other_source-name" label="Název"/>
					<TextField name="other_source-id" label="ID"/>
					<TextField name="other_source-identificator" label="Identifikátor hesla"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>biograficka data</h2>
					<TextField required name="name" label="Jmeno"/>
					<TextField required name="surname" label="Prijmeni"/>
					<TextField name="born_year" label="Rok narození"/>
					<TextField name="death_year" label="Rok úmrtí"/>
					<TextField name="initials" label="Rozpis iniciál"/>
					<TextField name="general_complement" label="Obecný doplněk "/>
					<TextField name="roman_numerals" label="Římské číslice"/>
					<TextField name="geographical_complement" label="Geografický doplněk"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField name="original_name" label="Původní jméno"/><br/>
					<TextField name="acronym" label="Akronym/zkratka"/><br/>
					<TextField name="cipher" label="Autorská šifra/novinářská značka"/><br/>
					<TextField name="religious_name" label="Církevní jméno"/><br/>
					<TextField name="marriage_name" label="Jméno získané sňatkem"/><br/>
					<TextField name="historical_name" label="Historická podoba jména"/><br/>
					<TextField name="straight_order" label="Přímé pořadí"/><br/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Tituly</h2>
					<TextField name="title" label="Tituly"/>
					<TextField name="date" label="Datum"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Biografická poznámka</h2>
					<TextField required name="bibliographical_note" label="Biografická poznámka"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Životopis</h2>
					<TextField name="cv" label="Životopis"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Obor působnosti</h2>
					<TextField name="domain_branch" label="Obor působnosti"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Pohlaví</h2>
					<GenderComboBox required name="gender" label="Pohlaví"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Příslušnost k zemi</h2>
					<GeographicComboBox name="country_membership" label="Příslušnost k zemi"/>
					<GeographicComboBox name="born_place" label="Místo narození"/>
					<GeographicComboBox name="death_place" label="Místo skonu"/>
					<GeographicComboBox name="related_country" label="Související země"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField name="language_country" label="Určení jazykové oblasti"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy a události</h2>
					<PersonComboBox name="parents" label="Rodiče"/>
					<PersonComboBox name="siblings" label="Sourozenci"/>
					<FamilyComboBox name="family" label="Člen rodu/rodiny"/>
					<CorporationComboBox name="membreship" label="Členství"/>
					<CorporationComboBox name="employment" label="Zaměstnání"/>
					<CorporationComboBox name="affiliation" label="Afiliace"/>
					<CreationComboBox name="important_subject" label="Významná díla"/>
					<SubjectComboBox name="important_event" label="Významné události"/>
					<TextField name="marriage_start" label="Uzavření manželství"/>
					<TextField name="marriage_end" label="Ukončení manželství"/>
					<CorporationComboBox name="study" label="Studium"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField name="arm" label="Erby"/>
					<TextField name="photo" label="Fotografie"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField name="notes" label="Poznámky"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField name="record_sources" label="Zdroje o heslu"/>
				</Paper>					
				<Button type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Person))