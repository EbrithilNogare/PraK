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
import typeDefinitionFile from './geographicTypes.json'

class Geographic extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "geographic"
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
					<h1>Nový záznam do Geografického rejstříku</h1>
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
						<TextField {...this.createFieldProps("acronym")}/>
						<TextField {...this.createFieldProps("historical_name")}/>
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
						<TextField {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Popis</h2>
						<KeywordComboBox {...this.createFieldProps("brief_characteristic")}/>
						<TextField {...this.createFieldProps("description")}/>
						<TextField {...this.createFieldProps("history")}/>
						<TextField {...this.createFieldProps("electronical_location")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Souřadnice</h2>
						<GPSField errorMessage="Chybný formát souřadnic" {...this.createFieldProps("coordinates")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
						<GeographicComboBox {...this.createFieldProps("partner_object")}/>
						<PersonComboBox {...this.createFieldProps("owner")}/>
						<h2>Zahrnuta v korporaci</h2>
						<CorporationComboBox {...this.createFieldProps("corporation_name")}/>
						<PersonComboBox {...this.createFieldProps("corporation_owner")}/>
						<h2>Spojená entita</h2>
						<PersonComboBox {...this.createFieldProps("related_person")}/>
						<CreationComboBox {...this.createFieldProps("related_subject")}/>
						<SubjectComboBox {...this.createFieldProps("related_event")}/>
						<CorporationComboBox {...this.createFieldProps("related_corporation")}/>
						<GeographicComboBox {...this.createFieldProps("superordinate")}/>
						<GeographicComboBox {...this.createFieldProps("subordinate")}/>
						<GeographicComboBox {...this.createFieldProps("country")}/>
						<GeographicComboBox {...this.createFieldProps("region")}/>
						<GeographicComboBox {...this.createFieldProps("district")}/>
						<GeographicComboBox {...this.createFieldProps("municipality")}/>
						<GeographicComboBox {...this.createFieldProps("municipality_part")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Počátek existence</h2>
						<PersonComboBox {...this.createFieldProps("founding_person")}/>
						<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
						<CreationComboBox {...this.createFieldProps("founding_document")}/>
						<GeographicComboBox {...this.createFieldProps("founding_place")}/>
						<SubjectComboBox {...this.createFieldProps("first_mention_event")}/>
						<CreationComboBox {...this.createFieldProps("first_mention_subject")}/>
						<GeographicComboBox {...this.createFieldProps("first_mention_place")}/>
						<TextField {...this.createFieldProps("founding_chronological_specification")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Konec existence</h2>
						<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
						<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
						<CreationComboBox {...this.createFieldProps("cancellation_document")}/>
						<GeographicComboBox {...this.createFieldProps("cancellation_place")}/>
						<SubjectComboBox {...this.createFieldProps("last_mention_event")}/>
						<CreationComboBox {...this.createFieldProps("last_mention_subject")}/>
						<GeographicComboBox {...this.createFieldProps("last_mention_place")}/>
						<GeographicComboBox {...this.createFieldProps("owner_change")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
						<TextField {...this.createFieldProps("historical_milestones")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Událost</h2>
						<CreationComboBox {...this.createFieldProps("award")}/>
						<SubjectComboBox {...this.createFieldProps("event_award")}/>
						<PersonComboBox {...this.createFieldProps("awarder_person")}/>
						<CorporationComboBox {...this.createFieldProps("awarder_corporation")}/>
					</Paper>
					<Paper className={styles.dataBlock}>
						<h2>Zařazení</h2>
						<KeywordComboBox required {...this.createFieldProps("category")}/>
						<KeywordComboBox {...this.createFieldProps("characteristic")}/>
						<TextField {...this.createFieldProps("arm")}/>
						<TextField {...this.createFieldProps("logo")}/>
						<TextField {...this.createFieldProps("mark")}/>
						<TextField {...this.createFieldProps("flag")}/>
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

export default withSnackbar(withRouter(Geographic))