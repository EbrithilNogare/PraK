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
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../comboBoxes'

import IndexParent from "./indexParent"

import styles from './parent.module.scss'

class Keyword extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "keyword"
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.header}>
					<h1>Nový záznam do Rejstříku klíčových slov</h1>
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
					<TextField label="Synonyma" onChange={e=>{this.handleFormChange(e, "synonyms")}}/>
					<TextField label="Termíny v invertovaném slovosledu" onChange={e=>{this.handleFormChange(e, "inverted_wordorder_terms")}}/>
					<TextField label="Pravopisné varianty " onChange={e=>{this.handleFormChange(e, "spelling_variants")}}/>
					<TextField label="Cizojazyčné deskriptory" onChange={e=>{this.handleFormChange(e, "foreign_language_descriptors")}}/>
					<TextField label="Tvar deskriptorů v singuláru" onChange={e=>{this.handleFormChange(e, "form_descriptors")}}/>
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
					<TextField label="Zpřesnění" onChange={e=>{this.handleFormChange(e, "clarification")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField label="Definice" onChange={e=>{this.handleFormChange(e, "definition")}}/>
					<TextField label="Pokyny k použití" onChange={e=>{this.handleFormChange(e, "manual")}}/>
					<TextField label="Historie" onChange={e=>{this.handleFormChange(e, "history")}}/>
					<TextField label="Elektronické umístění" onChange={e=>{this.handleFormChange(e, "electronical_location")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<KeywordComboBox label="Nadřazený" onChange={e=>{this.handleFormChange(e, "superordinate")}}/>
					<KeywordComboBox label="Podřazený" onChange={e=>{this.handleFormChange(e, "subordinate")}}/>
					<KeywordComboBox label="Asociativní" onChange={e=>{this.handleFormChange(e, "associative")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<PersonComboBox label="Začátek" onChange={e=>{this.handleFormChange(e, "founding_person")}}/>
					<CorporationComboBox label="Začátek" onChange={e=>{this.handleFormChange(e, "founding_corporation")}}/>
					<CreationComboBox label="Začátek" onChange={e=>{this.handleFormChange(e, "founding_subject")}}/>
					<SubjectComboBox label="Začátek" onChange={e=>{this.handleFormChange(e, "founding_event")}}/>
					<KeywordComboBox label="Začátek" onChange={e=>{this.handleFormChange(e, "founding_keyword")}}/>
					<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_beginning")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox label="Konec" onChange={e=>{this.handleFormChange(e, "cancellation_person")}}/>
					<CorporationComboBox label="Konec" onChange={e=>{this.handleFormChange(e, "cancellation_corporation")}}/>
					<CreationComboBox label="Konec" onChange={e=>{this.handleFormChange(e, "cancellation_subject")}}/>
					<SubjectComboBox label="Konec" onChange={e=>{this.handleFormChange(e, "cancellation_event")}}/>
					<KeywordComboBox label="Konec" onChange={e=>{this.handleFormChange(e, "cancellation_keyword")}}/>
					<TextField label="Chronologické zpřesnění" onChange={e=>{this.handleFormChange(e, "chronological_specification_cancellation")}}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox label="Kategorie" onChange={e=>{this.handleFormChange(e, "category")}}/>
					<KeywordComboBox label="Obor" onChange={e=>{this.handleFormChange(e, "domain")}}/>
					<TextField label="MDT" onChange={e=>{this.handleFormChange(e, "idc")}}/>
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

export default withSnackbar(withRouter(Keyword))