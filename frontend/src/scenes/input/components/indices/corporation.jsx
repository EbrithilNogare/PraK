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
import typeDefinitionFile from './corporationTypes.json'

class Corporation extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {}
		this.formData = {}

		this.indexURL = "corporation"
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
					<h1>Nový záznam do Rejstříku korporací</h1>
				</Paper>
				<div className={styles.body}>			
				<Paper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
					<TextField {...this.createFieldProps("other_source_name")}/>
					<TextField {...this.createFieldProps("other_source_id")}/>
					<TextField {...this.createFieldProps("other_source_identificator")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Název</h2>
					<TextField {...this.createFieldProps("name")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
					<TextField {...this.createFieldProps("acronym")}/><br/>
					<TextField {...this.createFieldProps("historical_name")}/><br/>
					<TextField {...this.createFieldProps("other_name_form")}/><br/>
					<TextField {...this.createFieldProps("following_name")}/><br/>
				</Paper>
				
				<Paper className={styles.dataBlock}> <h2>Části označení</h2>
					<TextField {...this.createFieldProps("main_part")}/>
					<TextField {...this.createFieldProps("side_part")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Doplňky označení</h2>
					<TextField {...this.createFieldProps("general_complement")}/>
					<TextField {...this.createFieldProps("geographical_complement")}/>
					<TextField {...this.createFieldProps("chronological_complement")}/>
					<TextField {...this.createFieldProps("brief_characteristic")}/>
					<TextField {...this.createFieldProps("history")}/>
					<TextField {...this.createFieldProps("function")}/>
					<TextField {...this.createFieldProps("constitutive_standards")}/>
					<TextField {...this.createFieldProps("scope_standards")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Souřadnice</h2>
					<GPSField {...this.createFieldProps("coordinates")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
					<CorporationComboBox {...this.createFieldProps("parent_corporation")}/>
					<CorporationComboBox {...this.createFieldProps("part_of")}/>
					<CorporationComboBox {...this.createFieldProps("precedent_corporation")}/>
					<GeographicComboBox {...this.createFieldProps("related_country")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vznik/ počátek existence</h2>
					<PersonComboBox {...this.createFieldProps("founder")}/>
					<CreationComboBox {...this.createFieldProps("founding_document")}/>
					<GeographicComboBox {...this.createFieldProps("founding_place")}/>
					<CreationComboBox {...this.createFieldProps("registration_subject")}/>
					<SubjectComboBox {...this.createFieldProps("registration_event")}/>
					<PersonComboBox {...this.createFieldProps("cleavage_person")}/>
					<CreationComboBox {...this.createFieldProps("cleavage_document")}/>
					<GeographicComboBox {...this.createFieldProps("cleavage_place")}/>
					<TextField {...this.createFieldProps("founding_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Konec existence</h2>
					<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
					<CreationComboBox {...this.createFieldProps("cancellation_document")}/>
					<GeographicComboBox {...this.createFieldProps("cancellation_place")}/>
					<CreationComboBox {...this.createFieldProps("delete_from_evidence_subject")}/>
					<SubjectComboBox {...this.createFieldProps("delete_from_evidence_event")}/>
					<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Událost</h2>
					<CorporationComboBox {...this.createFieldProps("owner_change")}/>
					<GeographicComboBox {...this.createFieldProps("place_change")}/>
					<CorporationComboBox {...this.createFieldProps("organisation_inclusion")}/>
					<CorporationComboBox {...this.createFieldProps("change_parent_organisation")}/>
					<CreationComboBox {...this.createFieldProps("award")}/>
					<SubjectComboBox {...this.createFieldProps("event_award")}/>
					<PersonComboBox {...this.createFieldProps("awarder_person")}/>
					<CorporationComboBox {...this.createFieldProps("awarder_corporation")}/>
				</Paper>				
				<Paper className={styles.dataBlock}> <h2>Zařazení</h2>
					<KeywordComboBox {...this.createFieldProps("category")}/>
					<GeographicComboBox {...this.createFieldProps("domain_scope")}/>
					<KeywordComboBox {...this.createFieldProps("geographical_scope")}/>
					<KeywordComboBox {...this.createFieldProps("characteristic")}/>
					<TextField {...this.createFieldProps("logo")}/>
					<TextField {...this.createFieldProps("mark")}/>
					<TextField {...this.createFieldProps("flag")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Poznámky</h2>
					<TextField {...this.createFieldProps("notes")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
					<TextField required {...this.createFieldProps("record_sources")}/>
				</Paper>					
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Corporation))