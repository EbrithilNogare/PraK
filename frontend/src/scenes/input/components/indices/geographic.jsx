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
		this.formData = {}

		this.indexURL = "geographic"
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
						<TextField label="Akronym/zkratka" onChange={e=>{this.handleFormChange(e, "acronym")}}/>
						<TextField label="Historická/dřívější forma jména" onChange={e=>{this.handleFormChange(e, "historical_name")}}/>
						<TextField label="Jiný tvar jména/označení" onChange={e=>{this.handleFormChange(e, "other_name_form")}}/>
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
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Popis</h2>
						<KeywordComboBox label="Stručná charakteristika" onChange={e=>{this.handleFormChange(e, "brief_characteristic")}}/>
						<TextField label="Popis" onChange={e=>{this.handleFormChange(e, "description")}}/>
						<TextField label="Historie" onChange={e=>{this.handleFormChange(e, "history")}}/>
						<TextField label="Elektronické umístění" onChange={e=>{this.handleFormChange(e, "electronical_location")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Souřadnice</h2>
						<GPSField label="Souřadnice" errorMessage="Chybný formát souřadnic" onChange={e=>{this.handleFormChange(e, "coordinates")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Vztahy</h2>
						<GeographicComboBox label="Partnerský geografický objekt" onChange={e=>{this.handleFormChange(e, "partner_object")}}/>
						<PersonComboBox label="Majitelé" onChange={e=>{this.handleFormChange(e, "owner")}}/>
						<h2>Zahrnuta v korporaci</h2>
						<CorporationComboBox label="Název" onChange={e=>{this.handleFormChange(e, "part_of.corporation_name")}}/>
						<PersonComboBox label="Majitel" onChange={e=>{this.handleFormChange(e, "part_of.corporation_owner")}}/>
						<h2>Spojená entita</h2>
						<PersonComboBox label="Spojená entita (Restřík osob)" onChange={e=>{this.handleFormChange(e, "related_entity.related_person")}}/>
						<CreationComboBox label="Spojená entita (Restřík dílo/výtvor)" onChange={e=>{this.handleFormChange(e, "related_entity.related_subject")}}/>
						<SubjectComboBox label="Spojená entita (Restřík událostí)" onChange={e=>{this.handleFormChange(e, "related_entity.related_event")}}/>
						<CorporationComboBox label="Spojená entita (Restřík korporací)" onChange={e=>{this.handleFormChange(e, "related_entity.related_corporation")}}/>
						<GeographicComboBox label="Nadřazený" onChange={e=>{this.handleFormChange(e, "superordinate")}}/>
						<GeographicComboBox label="Podřazený" onChange={e=>{this.handleFormChange(e, "subordinate")}}/>
						<GeographicComboBox label="Země" onChange={e=>{this.handleFormChange(e, "country")}}/>
						<GeographicComboBox label="Kraj" onChange={e=>{this.handleFormChange(e, "region")}}/>
						<GeographicComboBox label="Okres" onChange={e=>{this.handleFormChange(e, "district")}}/>
						<GeographicComboBox label="Obec" onChange={e=>{this.handleFormChange(e, "municipality")}}/>
						<GeographicComboBox label="Část obce" onChange={e=>{this.handleFormChange(e, "municipality_part")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Počátek existence</h2>
						<PersonComboBox label="Vznik (Restřík osob)" onChange={e=>{this.handleFormChange(e, "founding_person")}}/>
						<CorporationComboBox label="Vznik (Restřík korporací)" onChange={e=>{this.handleFormChange(e, "founding_corporation")}}/>
						<CreationComboBox label="Vznik (Restřík dílo/výtvor)" onChange={e=>{this.handleFormChange(e, "founding_document")}}/>
						<GeographicComboBox label="Vznik (Geografický restřík)" onChange={e=>{this.handleFormChange(e, "founding_place")}}/>
						<SubjectComboBox label="První písemná zmínka (Restřík událostí)" onChange={e=>{this.handleFormChange(e, "first_mention_event")}}/>
						<CreationComboBox label="První písemná zmínka (Restřík dílo/výtvor)" onChange={e=>{this.handleFormChange(e, "first_mention_subject")}}/>
						<GeographicComboBox label="První písemná zmínka (Geografický restřík)" onChange={e=>{this.handleFormChange(e, "first_mention_place")}}/>
						<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_beginning")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Konec existence</h2>
						<PersonComboBox label="Zánik (Restřík osob)" onChange={e=>{this.handleFormChange(e, "cancellation_person")}}/>
						<CorporationComboBox label="Zánik (Restřík korporací)" onChange={e=>{this.handleFormChange(e, "cancellation_corporation")}}/>
						<CreationComboBox label="Zánik (Restřík dílo/výtvor)" onChange={e=>{this.handleFormChange(e, "cancellation_document")}}/>
						<GeographicComboBox label="Zánik (Geografický restřík)" onChange={e=>{this.handleFormChange(e, "cancellation_place")}}/>
						<SubjectComboBox label="Poslední písemná zmínka (Restřík událostí)" onChange={e=>{this.handleFormChange(e, "last_mention_event")}}/>
						<CreationComboBox label="Poslední písemná zmínka (Restřík dílo/výtvor)" onChange={e=>{this.handleFormChange(e, "last_mention_subject")}}/>
						<GeographicComboBox label="Poslední písemná zmínka (Geografický restřík)" onChange={e=>{this.handleFormChange(e, "last_mention_place")}}/>
						<GeographicComboBox label="Změna majitele, držitele" onChange={e=>{this.handleFormChange(e, "owner_change")}}/>
						<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_cancellation")}}/>
						<TextField label="Historické milníky" onChange={e=>{this.handleFormChange(e, "historical_milestones")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Událost</h2>
						<CreationComboBox label="Ocenění" onChange={e=>{this.handleFormChange(e, "awards.award")}}/>
						<SubjectComboBox label="Udělení ocenění" onChange={e=>{this.handleFormChange(e, "awards.event_award")}}/>
						<PersonComboBox label="Udělovatel (Restřík osob)" onChange={e=>{this.handleFormChange(e, "awards.awarder_person")}}/>
						<CorporationComboBox label="Udělovatel (Restřík korporací)" onChange={e=>{this.handleFormChange(e, "awards.awarder_corporation")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zařazení</h2>
						<KeywordComboBox required label="Kategorie" onChange={e=>{this.handleFormChange(e, "category")}}/>
						<TextField label="Charakteristika" onChange={e=>{this.handleFormChange(e, "characteristic")}}/>
						<TextField label="Erb" onChange={e=>{this.handleFormChange(e, "arm")}}/>
						<TextField label="Logo" onChange={e=>{this.handleFormChange(e, "logo")}}/>
						<TextField label="Značka" onChange={e=>{this.handleFormChange(e, "mark")}}/>
						<TextField label="Vlajka" onChange={e=>{this.handleFormChange(e, "flag")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Poznámky</h2>
						<TextField multiline onChange={e=>{this.handleFormChange(e, "notes")}}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zdroje o heslu</h2>
						<TextField multiline onChange={e=>{this.handleFormChange(e, "record_sources")}}/>
					</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Geographic))