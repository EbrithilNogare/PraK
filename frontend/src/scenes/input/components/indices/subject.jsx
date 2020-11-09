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
import typeDefinitionFile from './subjectTypes.json'

class Subject extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "subject"
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
					<h1>Nový záznam do Rejstříku událostí</h1>
				</Paper>
				<div className={styles.body}>
					<Paper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
						<TextField {...this.createFieldProps("other_source_name")}/>
						<TextField {...this.createFieldProps("other_source_id")}/>
						<TextField {...this.createFieldProps("other_source_identificator")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Název</h2>
						<TextField required {...this.createFieldProps("name")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
						<TextField {...this.createFieldProps("acronym")}/><br/>
						<TextField {...this.createFieldProps("other_name_form")}/><br/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Části označení</h2>
						<TextField {...this.createFieldProps("main_part")}/>
						<TextField {...this.createFieldProps("other_part")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Doplňky označení</h2>
						<TextField {...this.createFieldProps("general_complement")}/>
						<TextField {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
						<TextField {...this.createFieldProps("event_order")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Popis</h2>
						<TextField required {...this.createFieldProps("description")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
						<SubjectComboBox {...this.createFieldProps("aggregate_event")}/>
						<SubjectComboBox {...this.createFieldProps("sub_event")}/>
						<PersonComboBox {...this.createFieldProps("related_person")}/>
						<CreationComboBox {...this.createFieldProps("related_subject")}/>
						<GeographicComboBox {...this.createFieldProps("related_place")}/>
						<GeographicComboBox {...this.createFieldProps("venue")}/>
						<PersonComboBox {...this.createFieldProps("organizator_person")}/>
						<CorporationComboBox {...this.createFieldProps("organizator_corporation")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Počátek existence</h2>
						<PersonComboBox {...this.createFieldProps("founding_person")}/>
						<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
						<GeographicComboBox {...this.createFieldProps("founding_place")}/>
						<CreationComboBox {...this.createFieldProps("first_mention")}/>
						<TextField {...this.createFieldProps("founding_chronological_specification")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Konec existence</h2>
						<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
						<CorporationComboBox {...this.createFieldProps("cancellation_event")}/>
						<GeographicComboBox {...this.createFieldProps("cancellation_place")}/>
						<CreationComboBox {...this.createFieldProps("last_mention")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Zařazení</h2>
						<KeywordComboBox {...this.createFieldProps("category")}/>
						<KeywordComboBox {...this.createFieldProps("topic")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Poznámky</h2>
						<TextField {...this.createFieldProps("notes")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
						<TextField {...this.createFieldProps("record_sources")}/>
					</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Subject))