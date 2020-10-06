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

class Creation extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}	
		this.indexURL = "creation"
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
					<h1>Nový záznam do Rejstříku díla / výtvoru</h1>
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
					<TextField name="other_name_form" label="Jiné označení"/><br/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField name="main_part" label="hlavní část"/>
					<TextField name="other_part" label="další část"/>
					<TextField name="numeric_tag" label="číselné označení"/>
					<TextField name="cast" label="obsazení hudebního díla"/>
					<TextField name="tone" label="tónina hudebního díla"/>
					<TextField name="arrangement" label="údaj o aranžmá hudebního díla"/>
					<TextField name="name_part" label="název části díla/výtvoru"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField name="general_complement" label="Obecný doplněk"/>
					<TextField name="geographical_complement" label="Geografický doplněk"/>
					<TextField name="chronological_complement" label="Chronologický doplněk"/>
					<TextField name="author" label="autor/tvůrce"/>
					<TextField name="language" label="jazyk díla"/>
					<TextField name="source" label="pramen/zdroj"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField name="brief_characteristic" label="stručná charakteristika"/>
					<TextField required name="description" label="popis"/>
					<TextField name="geographical_description" label="geografický popis"/>
					<TextField name="history" label="historie"/>
					<TextField name="purpose" label="účel a využití"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<GPSField name="coordinates" label="Souřadnice"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<CreationComboBox name="hierarchical_relations" label="hierarchické"/>
					<CreationComboBox name="associative_relations" label="asociativní"/>
					<GeographicComboBox name="locality" label="umístění, lokalita"/>
					<PersonComboBox name="related_person" label="spojená entita_person"/>
					<CorporationComboBox name="related_corporation" label="spojená entita_corporation"/>
					<SubjectComboBox name="related_event" label="spojená entita_event"/>
					<GeographicComboBox name="related_location" label="spojená entita_location"/>
					<PersonComboBox name="owner_person" label="majitelé_person"/>
					<CorporationComboBox name="owner_corporation" label="majitelé_corporation"/>
					<CreationComboBox name="related_document" label="související dokument"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vznik/ počátek existence</h2>
					<PersonComboBox name="founding_person" label="vznik_person"/>
					<CorporationComboBox name="founding_corporation" label="vznik_corporation"/>
					<GeographicComboBox name="first_mention_place" label="první písemná zmínka_place"/>
					<CreationComboBox name="first_mention_subject" label="první písemná zmínka_subject"/>
					<SubjectComboBox name="first_realization_event" label="první realizace_event"/>
					<CreationComboBox name="first_realization_subject" label="první realizace_subject"/>
					<TextField name="chronological_specification_beginning" label="chronologické zpřesnění"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox name="cancellation_person" label="zničení, zánik_person"/>
					<CorporationComboBox name="cancellation_corporation" label="zničení, zánik_corporation"/>
					<GeographicComboBox name="last_mention_place" label="poslední zmínka_place"/>
					<CreationComboBox name="last_mention_subject" label="poslední zmínka_subject"/>
					<SubjectComboBox name="last_realization_event" label="poslední realizace_event"/>
					<CreationComboBox name="last_realization_subject" label="poslední realizace_subject"/>
					<TextField name="chronological_specification_end" label="chronologické zpřesnění_end"/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Změna</h2>
					<PersonComboBox name="document_change_person" label="úprava, změna_person"/>
					<CorporationComboBox name="document_change_corporation" label="úprava, změna_corporation"/>
					<PersonComboBox name="ownership_change_person" label="změna vlastnictví, správy_person"/>
					<CorporationComboBox name="ownership_change_corporation" label="změna vlastnictví, správy_corporation"/>
					<GeographicComboBox name="location_change" label="změna umístění, uložení"/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox name="category" label="Zařazení"/>
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

export default withSnackbar(withRouter(Creation))