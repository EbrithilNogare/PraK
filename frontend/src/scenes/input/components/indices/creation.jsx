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
import typeDefinitionFile from './creationTypes.json'

class Creation extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "creation"
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
					<h1>Nový záznam do Rejstříku dílo/výtvor</h1>
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
					<TextField {...this.createFieldProps("other_name_form")}/><br/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Části označení</h2>
					<TextField {...this.createFieldProps("main_part")}/>
					<TextField {...this.createFieldProps("other_part")}/>
					<TextField {...this.createFieldProps("numeric_tag")}/>
					<TextField {...this.createFieldProps("cast")}/>
					<TextField {...this.createFieldProps("tone")}/>
					<TextField {...this.createFieldProps("arrangement")}/>
					<TextField {...this.createFieldProps("name_part")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Doplňky označení</h2>
					<TextField {...this.createFieldProps("general_complement")}/>
					<TextField {...this.createFieldProps("geographical_complement")}/>
					<TextField {...this.createFieldProps("chronological_complement")}/>
					<TextField {...this.createFieldProps("author")}/>
					<TextField {...this.createFieldProps("language")}/>
					<TextField {...this.createFieldProps("source")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Popis</h2>
					<TextField {...this.createFieldProps("brief_characteristic")}/>
					<TextField required {...this.createFieldProps("description")}/>
					<TextField {...this.createFieldProps("geographical_description")}/>
					<TextField {...this.createFieldProps("history")}/>
					<TextField {...this.createFieldProps("purpose")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Souřadnice</h2>
					<GPSField {...this.createFieldProps("coordinates")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vztahy</h2>
					<CreationComboBox {...this.createFieldProps("hierarchical_relations")}/>
					<CreationComboBox {...this.createFieldProps("associative_relations")}/>
					<GeographicComboBox {...this.createFieldProps("locality")}/>
					<PersonComboBox {...this.createFieldProps("related_person")}/>
					<CorporationComboBox {...this.createFieldProps("related_corporation")}/>
					<SubjectComboBox {...this.createFieldProps("related_event")}/>
					<GeographicComboBox {...this.createFieldProps("related_location")}/>
					<PersonComboBox {...this.createFieldProps("owner_person")}/>
					<CorporationComboBox {...this.createFieldProps("owner_corporation")}/>
					<CreationComboBox {...this.createFieldProps("related_document")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Vznik/ počátek existence</h2>
					<PersonComboBox {...this.createFieldProps("founding_person")}/>
					<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
					<GeographicComboBox {...this.createFieldProps("first_mention_place")}/>
					<CreationComboBox {...this.createFieldProps("first_mention_subject")}/>
					<SubjectComboBox {...this.createFieldProps("first_realization_event")}/>
					<CreationComboBox {...this.createFieldProps("first_realization_subject")}/>
					<TextField {...this.createFieldProps("founding_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Konec existence</h2>
					<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
					<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
					<GeographicComboBox {...this.createFieldProps("last_mention_place")}/>
					<CreationComboBox {...this.createFieldProps("last_mention_subject")}/>
					<SubjectComboBox {...this.createFieldProps("last_realization_event")}/>
					<CreationComboBox {...this.createFieldProps("last_realization_subject")}/>
					<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Změna</h2>
					<PersonComboBox {...this.createFieldProps("document_change_person")}/>
					<CorporationComboBox {...this.createFieldProps("document_change_corporation")}/>
					<PersonComboBox {...this.createFieldProps("ownership_change_person")}/>
					<CorporationComboBox {...this.createFieldProps("ownership_change_corporation")}/>
					<GeographicComboBox {...this.createFieldProps("location_change")}/>
				</Paper>
				<Paper className={styles.dataBlock}>
					<h2>Zařazení</h2>
					<KeywordComboBox required {...this.createFieldProps("category")}/>
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

export default withSnackbar(withRouter(Creation))