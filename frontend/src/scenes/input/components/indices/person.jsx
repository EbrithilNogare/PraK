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
		this.formData = {}

		this.indexURL = "person"
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
					<TextField label="Název" onChange={e=>{this.handleFormChange(e, "other_source.name")}}/>
					<TextField label="ID" onChange={e=>{this.handleFormChange(e, "other_source.id")}}/>
					<TextField label="Identifikátor hesla" onChange={e=>{this.handleFormChange(e, "other_source.identificator")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>biograficka data</h2>
					<TextField required label="Jmeno" onChange={e=>{this.handleFormChange(e, "name")}}/>
					<TextField required label="Prijmeni" onChange={e=>{this.handleFormChange(e, "surname")}}/>
					<TextField label="Rok narození" onChange={e=>{this.handleFormChange(e, "born_year")}}/>
					<TextField label="Rok úmrtí" onChange={e=>{this.handleFormChange(e, "death_year")}}/>
					<TextField label="Rozpis iniciál" onChange={e=>{this.handleFormChange(e, "initials")}}/>
					<TextField label="Obecný doplněk " onChange={e=>{this.handleFormChange(e, "general_complement")}}/>
					<TextField label="Římské číslice" onChange={e=>{this.handleFormChange(e, "roman_numerals")}}/>
					<TextField label="Geografický doplněk" onChange={e=>{this.handleFormChange(e, "geographical_complement")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField label="Původní jméno" onChange={e=>{this.handleFormChange(e, "original_name")}}/>
					<TextField label="Akronym/zkratka" onChange={e=>{this.handleFormChange(e, "acronym")}}/>
					<TextField label="Autorská šifra/novinářská značka" onChange={e=>{this.handleFormChange(e, "cipher")}}/>
					<TextField label="Církevní jméno" onChange={e=>{this.handleFormChange(e, "religious_name")}}/>
					<TextField label="Jméno získané sňatkem" onChange={e=>{this.handleFormChange(e, "marriage_name")}}/>
					<TextField label="Historická podoba jména" onChange={e=>{this.handleFormChange(e, "historical_name")}}/>
					<TextField label="Přímé pořadí" onChange={e=>{this.handleFormChange(e, "straight_order")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Tituly</h2>
					<TextField label="Tituly" onChange={e=>{this.handleFormChange(e, "titles.title")}}/>
					<TextField label="Datum" onChange={e=>{this.handleFormChange(e, "titles.date")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Biografická poznámka</h2>
					<TextField required label="Biografická poznámka" onChange={e=>{this.handleFormChange(e, "bibliographical_note")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Životopis</h2>
					<TextField label="Životopis" onChange={e=>{this.handleFormChange(e, "cv")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Obor působnosti</h2>
					<TextField label="Obor působnosti" onChange={e=>{this.handleFormChange(e, "domain_branch")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Pohlaví</h2>
					<GenderComboBox required label="Pohlaví" onChange={e=>{this.handleFormChange(e, "gender")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Příslušnost k zemi</h2>
					<GeographicComboBox label="Příslušnost k zemi" onChange={e=>{this.handleFormChange(e, "country_membership")}}/>
					<GeographicComboBox label="Místo narození" onChange={e=>{this.handleFormChange(e, "born_place")}}/>
					<GeographicComboBox label="Místo skonu" onChange={e=>{this.handleFormChange(e, "death_place")}}/>
					<GeographicComboBox label="Související země" onChange={e=>{this.handleFormChange(e, "related_country")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField label="Určení jazykové oblasti" onChange={e=>{this.handleFormChange(e, "language_country")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy a události</h2>
					<PersonComboBox label="Rodiče" onChange={e=>{this.handleFormChange(e, "parents")}}/>
					<PersonComboBox label="Sourozenci" onChange={e=>{this.handleFormChange(e, "siblings")}}/>
					<FamilyComboBox label="Člen rodu/rodiny" onChange={e=>{this.handleFormChange(e, "family")}}/>
					<CorporationComboBox label="Členství" onChange={e=>{this.handleFormChange(e, "membreship")}}/>
					<CorporationComboBox label="Zaměstnání" onChange={e=>{this.handleFormChange(e, "employment")}}/>
					<CorporationComboBox label="Afiliace" onChange={e=>{this.handleFormChange(e, "affiliation")}}/>
					<CreationComboBox label="Významná díla" onChange={e=>{this.handleFormChange(e, "important_subject")}}/>
					<SubjectComboBox label="Významné události" onChange={e=>{this.handleFormChange(e, "important_event")}}/>
					<TextField label="Uzavření manželství" onChange={e=>{this.handleFormChange(e, "marriage_start")}}/>
					<TextField label="Ukončení manželství" onChange={e=>{this.handleFormChange(e, "marriage_end")}}/>
					<CorporationComboBox label="Studium" onChange={e=>{this.handleFormChange(e, "study")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField label="Erby" onChange={e=>{this.handleFormChange(e, "arm")}}/>
					<TextField label="Fotografie" onChange={e=>{this.handleFormChange(e, "photo")}}/>
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

export default withSnackbar(withRouter(Person))