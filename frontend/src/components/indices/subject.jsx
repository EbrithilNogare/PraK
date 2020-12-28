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
	SubmitterComboBox,
} from '../comboBoxes'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './subjectTypes.json'
import Multiplier from '../Multiplier'

class Subject extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}

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
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku událostí</h1>
						: <h1>Nový záznam do Rejstříku událostí</h1>
					}
				</Paper>
				<div className={styles.body}>
					<Paper className={styles.dataBlock}> <h2>Preferované označení</h2>
						<TextField {...this.createFieldProps("name_main_part")} />
						<Multiplier><TextField {...this.createFieldProps("name_other_part")}/></Multiplier>
						<KeywordComboBox {...this.createFieldProps("general_complement")}/>
						<GeographicComboBox {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
						<TextField {...this.createFieldProps("event_order")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
						<Multiplier>
							<TextField {...this.createFieldProps("other_language_name")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_other_language")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_other_language")}/>
							<TextField {...this.createFieldProps("chronological_complement_other_language")}/>
						</Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("acronym")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_acronym")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_acronym")}/>
							<TextField {...this.createFieldProps("chronological_complement_acronym")}/>
						</Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("other_name_form")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_other_name")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_other_name")}/>
							<TextField {...this.createFieldProps("chronological_complement_other_name")}/>
						</Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("official_name")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_official")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_official")}/>
							<TextField {...this.createFieldProps("chronological_complement_official")}/>
						</Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("other_name_form")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_historical")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_historical")}/>
							<TextField {...this.createFieldProps("chronological_complement_historical")}/>
						</Multiplier>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Popis</h2>
						<TextField {...this.createFieldProps("brief_characteristic")}/>
						<TextField {...this.createFieldProps("history")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Vztahy</h2>
						<Multiplier><SubjectComboBox {...this.createFieldProps("sup_event")}/></Multiplier>
						<Multiplier><SubjectComboBox {...this.createFieldProps("sub_event")}/></Multiplier>
						<Multiplier><PersonComboBox {...this.createFieldProps("related_person")}/></Multiplier>
						<Multiplier><CreationComboBox {...this.createFieldProps("related_subject")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("related_place")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("venue")}/></Multiplier>
						<Multiplier><PersonComboBox {...this.createFieldProps("organizator_person")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("organizator_corporation")}/></Multiplier>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Počátek existence</h2>
						<PersonComboBox {...this.createFieldProps("founding_person")}/>
						<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
						<GeographicComboBox {...this.createFieldProps("founding_place")}/>
						<TextField {...this.createFieldProps("founding_document")}/>
						<TextField {...this.createFieldProps("founding_chronological_specification")}/>
						<TextField {...this.createFieldProps("first_mention_subject")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Konec existence</h2>
						<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
						<CorporationComboBox {...this.createFieldProps("cancellation_event")}/>
						<GeographicComboBox {...this.createFieldProps("cancellation_place")}/>
						<TextField {...this.createFieldProps("cancellation_document")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
						<TextField {...this.createFieldProps("last_mention_subject")}/>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Zařazení</h2>
						<Multiplier><KeywordComboBox {...this.createFieldProps("category")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("characteristic")}/></Multiplier>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Poznámky</h2>
						<Multiplier><TextField {...this.createFieldProps("public_note")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("nonpublic_note")}/></Multiplier>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
						<Multiplier>
							<TextField {...this.createFieldProps("other_source_name")}/>
							<TextField {...this.createFieldProps("other_source_id")}/>
							<TextField {...this.createFieldProps("other_source_identificator")}/>
						</Multiplier>
					</Paper>
					<Paper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
						<Multiplier><TextField {...this.createFieldProps("record_sources")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("editor_note")}/></Multiplier>
						<SubmitterComboBox {...this.createFieldProps("submitter")}/>
					</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Subject))