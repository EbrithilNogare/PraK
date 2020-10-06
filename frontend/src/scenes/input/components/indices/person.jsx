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
				<Paper className={styles.doubledataBlock}>
					<h1>Nový záznam do Rejstříku osoby</h1>
				</Paper>			
				<Paper className={styles.dataBlock}>
					<h2>Jiný zdroj</h2>
					<TextField name="other_source-name" label="Název"/>
					<TextField name="other_source-id" label="ID"/>
					<TextField name="other_source-identificator" label="Identifikátor hesla"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>biograficka data</h2>
					<TextField required name="name" label="jmeno"/>
					<TextField required name="surname" label="prijmeni"/>
					<TextField name="born_year" label="Rok narození"/>
					<TextField name="death_year" label="Rok úmrtí"/>
					<TextField name="initials" label="rozpis iniciál"/>
					<TextField name="general_complement" label="obecný doplněk "/>
					<TextField name="roman_numerals" label="římské číslice"/>
					<TextField name="geographical_complement" label="geografický doplněk"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField name="original_name" label="původní jméno"/><br/>
					<TextField name="acronym" label="akronym/zkratka"/><br/>
					<TextField name="cipher" label="autorská šifra/novinářská značka"/><br/>
					<TextField name="religious_name" label="církevní jméno"/><br/>
					<TextField name="marriage_name" label="jméno získané sňatkem"/><br/>
					<TextField name="historical_name" label="historická podoba jména"/><br/>
					<TextField name="straight_order" label="přímé pořadí"/><br/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Tituly</h2>
					<TextField name="title" label="Tituly"/>
					<TextField name="date" label="datum"/>
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
					<GeographicComboBox name="born_place" label="místo narození"/>
					<GeographicComboBox name="death_place" label="místo skonu"/>
					<GeographicComboBox name="related_country" label="související země"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField name="language_country" label="Určení jazykové oblasti"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy a události</h2>
					<PersonComboBox name="parents" label="rodiče"/>
					<PersonComboBox name="siblings" label="sourozenci"/>
					<FamilyComboBox name="family" label="člen rodu/rodiny"/>
					<CorporationComboBox name="membreship" label="členství"/>
					<CorporationComboBox name="employment" label="zaměstnání"/>
					<CorporationComboBox name="affiliation" label="afiliace"/>
					<CreationComboBox name="important_subject" label="významná díla"/>
					<SubjectComboBox name="important_event" label="významné události"/>
					<TextField name="marriage_start" label="uzavření manželství"/>
					<TextField name="marriage_end" label="ukončení manželství"/>
					<CorporationComboBox name="study" label="studium"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Určení jazykové oblasti</h2>
					<TextField name="arm" label="erby"/>
					<TextField name="photo" label="fotografie"/>
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
			</form>
		)
	}
}

export default withSnackbar(withRouter(Person))