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
import typeDefinitionFile from './keywordTypes.json'

class Keyword extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "keyword"
	}

	getTypeDefinition = fieldName => typeDefinitionFile.properties[fieldName]

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
					<TextField {...this.createFieldProps("other_source_name")}/>
					<TextField {...this.createFieldProps("other_source_id")}/>
					<TextField {...this.createFieldProps("other_source_identificator")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Název</h2>
					<TextField required {...this.createFieldProps("name")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Variantní označení</h2>
					<TextField {...this.createFieldProps("synonyms")}/>
					<TextField {...this.createFieldProps("inverted_wordorder_terms")}/>
					<TextField {...this.createFieldProps("spelling_variants")}/>
					<TextField {...this.createFieldProps("foreign_language_descriptors")}/>
					<TextField {...this.createFieldProps("form_descriptors")}/>
					<TextField {...this.createFieldProps("other_name_form")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField {...this.createFieldProps("main_part")}/>
					<TextField {...this.createFieldProps("other_part")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField {...this.createFieldProps("general_complement")}/>
					<TextField {...this.createFieldProps("clarification")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField {...this.createFieldProps("definition")}/>
					<TextField {...this.createFieldProps("manual")}/>
					<TextField {...this.createFieldProps("history")}/>
					<TextField {...this.createFieldProps("electronical_location")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<KeywordComboBox {...this.createFieldProps("superordinate")}/>
					<KeywordComboBox {...this.createFieldProps("subordinate")}/>
					<KeywordComboBox {...this.createFieldProps("associative")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Počátek existence</h2>
					<PersonComboBox {...this.createFieldProps("founding_person")}/>
					<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
					<CreationComboBox {...this.createFieldProps("founding_subject")}/>
					<SubjectComboBox {...this.createFieldProps("founding_event")}/>
					<KeywordComboBox {...this.createFieldProps("founding_keyword")}/>
					<TextField {...this.createFieldProps("founding_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
					<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
					<CreationComboBox {...this.createFieldProps("cancellation_subject")}/>
					<SubjectComboBox {...this.createFieldProps("cancellation_event")}/>
					<KeywordComboBox {...this.createFieldProps("cancellation_keyword")}/>
					<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox {...this.createFieldProps("category")}/>
					<KeywordComboBox {...this.createFieldProps("domain")}/>
					<TextField {...this.createFieldProps("idc")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Poznámky</h2>
					<TextField {...this.createFieldProps("notes")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zdroje o heslu</h2>
					<TextField {...this.createFieldProps("record_sources")}/>
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Keyword))