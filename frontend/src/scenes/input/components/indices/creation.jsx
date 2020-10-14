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
		this.formData = {}

		this.indexURL = "creation"
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					<h1>Nový záznam do Rejstříku díla / výtvoru</h1>
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
					<TextField label="Jiné označení" onChange={e=>{this.handleFormChange(e, "other_name_form")}}/><br/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField label="hlavní část" onChange={e=>{this.handleFormChange(e, "main_part")}}/>
					<TextField label="další část" onChange={e=>{this.handleFormChange(e, "other_part")}}/>
					<TextField label="číselné označení" onChange={e=>{this.handleFormChange(e, "numeric_tag")}}/>
					<TextField label="obsazení hudebního díla" onChange={e=>{this.handleFormChange(e, "cast")}}/>
					<TextField label="tónina hudebního díla" onChange={e=>{this.handleFormChange(e, "tone")}}/>
					<TextField label="údaj o aranžmá hudebního díla" onChange={e=>{this.handleFormChange(e, "arrangement")}}/>
					<TextField label="název části díla/výtvoru" onChange={e=>{this.handleFormChange(e, "name_part")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField label="Obecný doplněk" onChange={e=>{this.handleFormChange(e, "general_complement")}}/>
					<TextField label="Geografický doplněk" onChange={e=>{this.handleFormChange(e, "geographical_complement")}}/>
					<TextField label="Chronologický doplněk" onChange={e=>{this.handleFormChange(e, "chronological_complement")}}/>
					<TextField label="autor/tvůrce" onChange={e=>{this.handleFormChange(e, "author")}}/>
					<TextField label="jazyk díla" onChange={e=>{this.handleFormChange(e, "language")}}/>
					<TextField label="pramen/zdroj" onChange={e=>{this.handleFormChange(e, "source")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField label="stručná charakteristika" onChange={e=>{this.handleFormChange(e, "brief_characteristic")}}/>
					<TextField required label="popis" onChange={e=>{this.handleFormChange(e, "description")}}/>
					<TextField label="geografický popis" onChange={e=>{this.handleFormChange(e, "geographical_description")}}/>
					<TextField label="historie" onChange={e=>{this.handleFormChange(e, "history")}}/>
					<TextField label="účel a využití" onChange={e=>{this.handleFormChange(e, "purpose")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<GPSField label="Souřadnice" onChange={e=>{this.handleFormChange(e, "coordinates")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<CreationComboBox label="hierarchické" onChange={e=>{this.handleFormChange(e, "hierarchical_relations")}}/>
					<CreationComboBox label="asociativní" onChange={e=>{this.handleFormChange(e, "associative_relations")}}/>
					<GeographicComboBox label="umístění, lokalita" onChange={e=>{this.handleFormChange(e, "locality")}}/>
					<PersonComboBox label="spojená entita_person" onChange={e=>{this.handleFormChange(e, "related_person")}}/>
					<CorporationComboBox label="spojená entita_corporation" onChange={e=>{this.handleFormChange(e, "related_corporation")}}/>
					<SubjectComboBox label="spojená entita_event" onChange={e=>{this.handleFormChange(e, "related_event")}}/>
					<GeographicComboBox label="spojená entita_location" onChange={e=>{this.handleFormChange(e, "related_location")}}/>
					<PersonComboBox label="majitelé_person" onChange={e=>{this.handleFormChange(e, "owner_person")}}/>
					<CorporationComboBox label="majitelé_corporation" onChange={e=>{this.handleFormChange(e, "owner_corporation")}}/>
					<CreationComboBox label="související dokument" onChange={e=>{this.handleFormChange(e, "related_document")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vznik/ počátek existence</h2>
					<PersonComboBox label="vznik_person" onChange={e=>{this.handleFormChange(e, "founding_person")}}/>
					<CorporationComboBox label="vznik_corporation" onChange={e=>{this.handleFormChange(e, "founding_corporation")}}/>
					<GeographicComboBox label="první písemná zmínka_place" onChange={e=>{this.handleFormChange(e, "first_mention_place")}}/>
					<CreationComboBox label="první písemná zmínka_subject" onChange={e=>{this.handleFormChange(e, "first_mention_subject")}}/>
					<SubjectComboBox label="první realizace_event" onChange={e=>{this.handleFormChange(e, "first_realization_event")}}/>
					<CreationComboBox label="první realizace_subject" onChange={e=>{this.handleFormChange(e, "first_realization_subject")}}/>
					<TextField label="chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_beginning")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox label="zničení, zánik_person" onChange={e=>{this.handleFormChange(e, "cancellation_person")}}/>
					<CorporationComboBox label="zničení, zánik_corporation" onChange={e=>{this.handleFormChange(e, "cancellation_corporation")}}/>
					<GeographicComboBox label="poslední zmínka_place" onChange={e=>{this.handleFormChange(e, "last_mention_place")}}/>
					<CreationComboBox label="poslední zmínka_subject" onChange={e=>{this.handleFormChange(e, "last_mention_subject")}}/>
					<SubjectComboBox label="poslední realizace_event" onChange={e=>{this.handleFormChange(e, "last_realization_event")}}/>
					<CreationComboBox label="poslední realizace_subject" onChange={e=>{this.handleFormChange(e, "last_realization_subject")}}/>
					<TextField label="chronologické zpřesnění_end" onChange={e=>{this.handleFormChange(e, "chronological_specification_end")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Změna</h2>
					<PersonComboBox label="úprava, změna_person" onChange={e=>{this.handleFormChange(e, "document_change_person")}}/>
					<CorporationComboBox label="úprava, změna_corporation" onChange={e=>{this.handleFormChange(e, "document_change_corporation")}}/>
					<PersonComboBox label="změna vlastnictví, správy_person" onChange={e=>{this.handleFormChange(e, "ownership_change_person")}}/>
					<CorporationComboBox label="změna vlastnictví, správy_corporation" onChange={e=>{this.handleFormChange(e, "ownership_change_corporation")}}/>
					<GeographicComboBox label="změna umístění, uložení" onChange={e=>{this.handleFormChange(e, "location_change")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox label="Zařazení" onChange={e=>{this.handleFormChange(e, "category")}}/>
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

export default withSnackbar(withRouter(Creation))