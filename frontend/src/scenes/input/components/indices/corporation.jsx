import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { 
	TextField,
	Button,
	Paper,
	InputAdornment,
	Tooltip,
} from '@material-ui/core'

import {
	HelpOutline
} from '@material-ui/icons'

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
		this.formData = {}

		this.indexURL = "corporation"
	}

	helperProp = (text) => {return{
		endAdornment: (
			<InputAdornment position = "end" >
				<Tooltip title = {text} >
					<HelpOutline style = {{fontSize: 15, cursor: "help"}}/>
				</Tooltip>
			</InputAdornment>
		)}}
	

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
					<TextField
						label="Název"
						onChange={e=>{this.handleFormChange(e, "other_source.name")}}
					/>
					<TextField
						label="ID"
						onChange = { e => { this.handleFormChange(e, "other_source.id") } }
						InputProps = {this.helperProp("just fill it")}
					/>
					<TextField label="Identifikátor hesla" onChange={e=>{this.handleFormChange(e, "other_source.identificator")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Název</h2>
					<TextField required label="Název" onChange={e=>{this.handleFormChange(e, "name")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField label="Akronym/zkratka" onChange={e=>{this.handleFormChange(e, "acronym")}}/><br/>
					<TextField label="Historická/dřívější forma jména" onChange={e=>{this.handleFormChange(e, "historical_name")}}/><br/>
					<TextField label="Jiné označení" onChange={e=>{this.handleFormChange(e, "other_name_form")}}/><br/>
					<TextField label="Následující forma jména" onChange={e=>{this.handleFormChange(e, "following_name")}}/><br/>
				</Paper>
				
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField label="Hlavní část" onChange={e=>{this.handleFormChange(e, "main_part")}}/>
					<TextField label="Vedlejší část" onChange={e=>{this.handleFormChange(e, "side_part")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField label="Obecný doplněk" onChange={e=>{this.handleFormChange(e, "general_complement")}}/>
					<TextField label="Geografický doplněk" onChange={e=>{this.handleFormChange(e, "geographical_complement")}}/>
					<TextField label="Chronologický doplněk" onChange={e=>{this.handleFormChange(e, "chronological_complement")}}/>
					<TextField label="Stručná charakteristika" onChange={e=>{this.handleFormChange(e, "brief_characteristic")}}/>
					<TextField label="Historie" onChange={e=>{this.handleFormChange(e, "history")}}/>
					<TextField label="Funkce" onChange={e=>{this.handleFormChange(e, "function")}}/>
					<TextField label="Normy konstitutivní" onChange={e=>{this.handleFormChange(e, "constitutive_standards")}}/>
					<TextField label="Normy - působnost původce" onChange={e=>{this.handleFormChange(e, "scope_standards")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<GPSField label="Souřadnice" onChange={e=>{this.handleFormChange(e, "coordinates")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<CorporationComboBox label="Nadřízená korporace" onChange={e=>{this.handleFormChange(e, "parent_corporation")}}/>
					<CorporationComboBox label="Je část" onChange={e=>{this.handleFormChange(e, "part_of")}}/>
					<CorporationComboBox label="Zahrnuta v korporaci" onChange={e=>{this.handleFormChange(e, "precedent_corporation")}}/>
					<GeographicComboBox label="Související země" onChange={e=>{this.handleFormChange(e, "related_country")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vznik/ počátek existence</h2>
					<PersonComboBox label="Zřízení, založení zakladatel" onChange={e=>{this.handleFormChange(e, "founder")}}/>
					<CreationComboBox label="Ustanovující dokument" onChange={e=>{this.handleFormChange(e, "founding_document")}}/>
					<GeographicComboBox label="Geografický objekt v roli předchůdce" onChange={e=>{this.handleFormChange(e, "founding_place")}}/>
					<CreationComboBox label="Zapsání díla" onChange={e=>{this.handleFormChange(e, "registration_subject")}}/>
					<SubjectComboBox label="Událost" onChange={e=>{this.handleFormChange(e, "registration_event")}}/>
					<PersonComboBox label="Odštěpení evidence existence - osoba" onChange={e=>{this.handleFormChange(e, "cleavage_person")}}/>
					<CreationComboBox label="Ustanovující dokument" onChange={e=>{this.handleFormChange(e, "cleavage_document")}}/>
					<GeographicComboBox label="Geografický objekt v roli předchůdce" onChange={e=>{this.handleFormChange(e, "cleavage_place")}}/>
					<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_beginning")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox label="Zrušení, likvidace, rozpuštění osoba/bytost která se podílela na zániku" onChange={e=>{this.handleFormChange(e, "cancellation_person")}}/>
					<CreationComboBox label="Související dokument" onChange={e=>{this.handleFormChange(e, "cancellation_document")}}/>
					<GeographicComboBox label="Geografický objekt jako následník" onChange={e=>{this.handleFormChange(e, "cancellation_place")}}/>
					<CreationComboBox label="Výmaz z evidence dilo/vytvor" onChange={e=>{this.handleFormChange(e, "delete_from_evidence_subject")}}/>
					<SubjectComboBox label="Událost" onChange={e=>{this.handleFormChange(e, "delete_from_evidence_event")}}/>
					<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_cancellation")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Událost</h2>
					<CorporationComboBox label="Změna majitele, držitele" onChange={e=>{this.handleFormChange(e, "owner_change")}}/>
					<GeographicComboBox label="Přesun na jiné místo" onChange={e=>{this.handleFormChange(e, "place_change")}}/>
					<CorporationComboBox label="Organizační začlenění" onChange={e=>{this.handleFormChange(e, "organisation_inclusion")}}/>
					<CorporationComboBox label="Změna nadřazené organizace" onChange={e=>{this.handleFormChange(e, "change_parent_organisation")}}/>
					<CreationComboBox label="Ocenění" onChange={e=>{this.handleFormChange(e, "awards.award")}}/>
					<SubjectComboBox label="Udělení ocenění" onChange={e=>{this.handleFormChange(e, "awards.event_award")}}/>
					<PersonComboBox label="Udělovatel_Osoba" onChange={e=>{this.handleFormChange(e, "awards.awarder_person")}}/>
					<CorporationComboBox label="Udělovatel_Korporace" onChange={e=>{this.handleFormChange(e, "awards.awarder_corporation")}}/>
				</Paper>				
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox label="Zařazení" onChange={e=>{this.handleFormChange(e, "category")}}/>
					<GeographicComboBox label="Obor působnosti" onChange={e=>{this.handleFormChange(e, "domain_scope")}}/>
					<KeywordComboBox label="Geografická působnosti" onChange={e=>{this.handleFormChange(e, "geographical_scope")}}/>
					<KeywordComboBox label="Charakteristika" onChange={e=>{this.handleFormChange(e, "characteristic")}}/>
					<TextField label="Logo" onChange={e=>{this.handleFormChange(e, "logo")}}/>
					<TextField label="Značka" onChange={e=>{this.handleFormChange(e, "mark")}}/>
					<TextField label="Vlajka" onChange={e=>{this.handleFormChange(e, "flag")}}/>
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

export default withSnackbar(withRouter(Corporation))