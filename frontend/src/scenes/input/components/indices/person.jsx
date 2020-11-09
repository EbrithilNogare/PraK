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
	FamilyComboBox,
	StaticComboBox,
} from '../comboBoxes'
import DateField from '../validationTextFields/DateField'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './personTypes.json'

class Person extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}
		this.formData = {}

		this.indexURL = "person"
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
					<h1>Nový záznam do Rejstříku osob</h1>
				</Paper>
				<div className={styles.body}>
				<Paper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
					<TextField {...this.createFieldProps("other_source_name")}/>
					<TextField {...this.createFieldProps("other_source_id")}/>
					<TextField {...this.createFieldProps("other_source_identificator")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Biograficka data</h2>
					<TextField {...this.createFieldProps("name")}/>
					<TextField {...this.createFieldProps("surname")}/>
					<TextField {...this.createFieldProps("born_year")}/>
					<TextField {...this.createFieldProps("death_year")}/>
					<TextField {...this.createFieldProps("initials")}/>
					<TextField {...this.createFieldProps("general_complement")}/>
					<TextField {...this.createFieldProps("roman_numerals")}/>
					<TextField {...this.createFieldProps("geographical_complement")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
					<TextField {...this.createFieldProps("original_name")}/>
					<TextField {...this.createFieldProps("acronym")}/>
					<TextField {...this.createFieldProps("cipher")}/>
					<TextField {...this.createFieldProps("religious_name")}/>
					<TextField {...this.createFieldProps("marriage_name")}/>
					<TextField {...this.createFieldProps("historical_name")}/>
					<TextField {...this.createFieldProps("straight_order")}/>
					<TextField {...this.createFieldProps("other_name_form")}/>
					<TextField {...this.createFieldProps("pseudonym")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Tituly</h2>
					<TextField {...this.createFieldProps("title")}/>
					<DateField {...this.createFieldProps("date")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Biografická poznámka</h2>
					<TextField {...this.createFieldProps("bibliographical_note")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Životopis</h2>
					<TextField {...this.createFieldProps("cv")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Obor působnosti</h2>
					<TextField {...this.createFieldProps("domain_branch")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Pohlaví</h2>
					<StaticComboBox {...this.createFieldProps("gender")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Příslušnost k zemi</h2>
					<GeographicComboBox {...this.createFieldProps("country_membership")}/>
					<GeographicComboBox {...this.createFieldProps("born_place")}/>
					<GeographicComboBox {...this.createFieldProps("death_place")}/>
					<GeographicComboBox {...this.createFieldProps("related_country")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Určení jazykové oblasti</h2>
					<StaticComboBox {...this.createFieldProps("language_country")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vztahy a události</h2>
					<PersonComboBox {...this.createFieldProps("parents")}/>
					<PersonComboBox {...this.createFieldProps("siblings")}/>
					<FamilyComboBox {...this.createFieldProps("family")}/>
					<CorporationComboBox {...this.createFieldProps("membreship")}/>
					<KeywordComboBox {...this.createFieldProps("employment")}/>
					<CorporationComboBox {...this.createFieldProps("affiliation")}/>
					<CreationComboBox {...this.createFieldProps("important_subject")}/>
					<SubjectComboBox {...this.createFieldProps("important_event")}/>
					<TextField {...this.createFieldProps("marriage_start")}/>
					<TextField {...this.createFieldProps("marriage_end")}/>
					<CorporationComboBox {...this.createFieldProps("study")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vyobrazení</h2>
					<TextField {...this.createFieldProps("arm")}/>
					<TextField {...this.createFieldProps("photo")}/>
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

export default withSnackbar(withRouter(Person))