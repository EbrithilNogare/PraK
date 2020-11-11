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
import Multiplier from '../Multiplier'

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
						<TextField {...this.createFieldProps("other_name_form")}/><br/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Části označení</h2>
					<TextField {...this.createFieldProps("numeric_tag")}/>
					<Multiplier>
						<TextField {...this.createFieldProps("cast")}/>
					</Multiplier>
					<TextField {...this.createFieldProps("tone")}/>
					<Multiplier>
						<TextField {...this.createFieldProps("arrangement")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("name_part")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Doplňky označení</h2>
					<TextField {...this.createFieldProps("general_complement")}/>
					<TextField {...this.createFieldProps("geographical_complement")}/>
					<TextField {...this.createFieldProps("chronological_complement")}/>
					<Multiplier>
						<TextField {...this.createFieldProps("author")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("language")}/>
					</Multiplier>
					<Multiplier>
						<TextField {...this.createFieldProps("source")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Popis</h2>
					<TextField {...this.createFieldProps("brief_characteristic")}/>
					<TextField {...this.createFieldProps("description")}/>
					<TextField {...this.createFieldProps("geographical_description")}/>
					<TextField {...this.createFieldProps("history")}/>
					<Multiplier>
						<TextField {...this.createFieldProps("purpose")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Souřadnice</h2>
					<GPSField {...this.createFieldProps("coordinates")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
					<Multiplier>
						<CreationComboBox {...this.createFieldProps("hierarchical_relations")}/>
					</Multiplier>
					<CreationComboBox {...this.createFieldProps("associative_relations")}/>
					<Multiplier>
						<GeographicComboBox {...this.createFieldProps("locality")}/>
					</Multiplier>
					<Multiplier>
						<PersonComboBox {...this.createFieldProps("related_person")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("related_corporation")}/>
					</Multiplier>
					<Multiplier>
						<SubjectComboBox {...this.createFieldProps("related_event")}/>
					</Multiplier>
					<Multiplier>
						<GeographicComboBox {...this.createFieldProps("related_location")}/>
					</Multiplier>
					<Multiplier>
						<PersonComboBox {...this.createFieldProps("owner_person")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("owner_corporation")}/>
					</Multiplier>
					<Multiplier>
						<CreationComboBox {...this.createFieldProps("related_document")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vznik/ počátek existence</h2>
					<PersonComboBox {...this.createFieldProps("founding_person")}/>
					<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
					<GeographicComboBox {...this.createFieldProps("first_mention_place")}/>
					<CreationComboBox {...this.createFieldProps("first_mention_subject")}/>
					<SubjectComboBox {...this.createFieldProps("first_realization_event")}/>
					<CreationComboBox {...this.createFieldProps("first_realization_subject")}/>
					<TextField {...this.createFieldProps("founding_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Konec existence</h2>
					<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
					<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
					<GeographicComboBox {...this.createFieldProps("last_mention_place")}/>
					<CreationComboBox {...this.createFieldProps("last_mention_subject")}/>
					<SubjectComboBox {...this.createFieldProps("last_realization_event")}/>
					<CreationComboBox {...this.createFieldProps("last_realization_subject")}/>
					<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Změna</h2>
					<Multiplier>
						<PersonComboBox {...this.createFieldProps("document_change_person")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("document_change_corporation")}/>
					</Multiplier>
					<Multiplier>
						<PersonComboBox {...this.createFieldProps("ownership_change_person")}/>
					</Multiplier>
					<Multiplier>
						<CorporationComboBox {...this.createFieldProps("ownership_change_corporation")}/>
					</Multiplier>
					<Multiplier>
						<GeographicComboBox {...this.createFieldProps("location_change")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Zařazení</h2>
					<Multiplier>
						<KeywordComboBox {...this.createFieldProps("category")}/>
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

export default withSnackbar(withRouter(Creation))