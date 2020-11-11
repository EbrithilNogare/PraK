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
import Multiplier from '../Multiplier'

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
				<Multiplier>
					<TextField {...this.createFieldProps("other_source_name")}/>
					<TextField {...this.createFieldProps("other_source_id")}/>
					<TextField {...this.createFieldProps("other_source_identificator")}/>
				</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Název</h2>
					<TextField {...this.createFieldProps("name_main_part")}/>
					<TextField {...this.createFieldProps("name_other_part")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
					<Multiplier>
						<TextField {...this.createFieldProps("acronym")}/><br/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("historical_name")}/><br/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("other_name_form")}/><br/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("following_name")}/><br/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Doplňky označení</h2>
					<TextField {...this.createFieldProps("general_complement")}/>
					<TextField {...this.createFieldProps("geographical_complement")}/>
					<TextField {...this.createFieldProps("chronological_complement")}/>
					<TextField {...this.createFieldProps("brief_characteristic")}/>
					<TextField {...this.createFieldProps("history")}/>
					<TextField {...this.createFieldProps("function")}/>
					<Multiplier>
						<TextField {...this.createFieldProps("constitutive_standards")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("scope_standards")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Souřadnice</h2>
					<GPSField {...this.createFieldProps("coordinates")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("parent_corporation")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("part_of")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("precedent_corporation")}/>
					</Multiplier>
					<Multiplier>
						<GeographicComboBox {...this.createFieldProps("related_country")}/>
					</Multiplier>
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
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("owner_change")}/>
					</Multiplier>
					<Multiplier>
						<GeographicComboBox {...this.createFieldProps("place_change")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("organisation_inclusion")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("change_parent_organisation")}/>
					</Multiplier>
					<Multiplier>
						<CreationComboBox {...this.createFieldProps("award")}/>
						<SubjectComboBox {...this.createFieldProps("event_award")}/>
						<PersonComboBox {...this.createFieldProps("awarder_person")}/>
						<CorporationComboBox {...this.createFieldProps("awarder_corporation")}/>
					</Multiplier>
				</Paper>				
				<Paper className={styles.dataBlock}> <h2>Zařazení</h2>
					<Multiplier>
						<KeywordComboBox {...this.createFieldProps("category")}/>
					</Multiplier>
					<Multiplier>
						<GeographicComboBox {...this.createFieldProps("domain_scope")}/>
					</Multiplier>
					<Multiplier>
						<KeywordComboBox {...this.createFieldProps("geographical_scope")}/>
					</Multiplier>
					<Multiplier>
						<KeywordComboBox {...this.createFieldProps("characteristic")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("logo")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("mark")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("flag")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Poznámky</h2>
					<Multiplier>
						<TextField {...this.createFieldProps("notes")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
					<Multiplier>
						<TextField {...this.createFieldProps("record_sources")}/>
					</Multiplier>
				</Paper>					
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Corporation))