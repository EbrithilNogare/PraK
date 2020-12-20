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
	StaticOpenComboBox,
} from '../comboBoxes'
import DateField from '../validationTextFields/DateField'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import typeDefinitionFile from './personTypes.json'
import Multiplier from '../Multiplier'
import LabeledCheckbox from "../LabeledCheckbox"
import MetadataComboBox from "components/comboBoxes/MetadataComboBox"

class Person extends IndexParent {
	constructor(props){
		super(props)

		this.state = {}

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
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku osob</h1>
						: <h1>Nový záznam do Rejstříku osob</h1>
					}
				</Paper>
				<div className={styles.body}>
				<Paper className={styles.dataBlock}> <h2>Biograficka data</h2>
					<TextField {...this.createFieldProps("name")}/>
					<TextField {...this.createFieldProps("surname")}/>
					<TextField {...this.createFieldProps("born_year")}/><LabeledCheckbox {...this.createFieldProps("born_year_notKnown")}/>
					<TextField {...this.createFieldProps("born_date")}/>
					<GeographicComboBox {...this.createFieldProps("born_place")}/>
					<TextField {...this.createFieldProps("death_year")}/><LabeledCheckbox {...this.createFieldProps("death_year_notKnown")}/>
					<TextField {...this.createFieldProps("death_date")}/>
					<GeographicComboBox {...this.createFieldProps("death_place")}/>
					<TextField {...this.createFieldProps("initials")}/>
					<TextField {...this.createFieldProps("roman_numerals")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Variantní označení</h2>
					<Multiplier><TextField {...this.createFieldProps("other_language_name")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("original_name")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("acronym")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("cipher")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("religious_name")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("marriage_name")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("historical_name")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("straight_order")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("other_name_form")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("pseudonym")}/></Multiplier>
					<Multiplier>
						<KeywordComboBox {...this.createFieldProps("general_complement")}/>
						<GeographicComboBox {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Tituly</h2>
					<Multiplier>
						<TextField {...this.createFieldProps("title")}/>
						<DateField {...this.createFieldProps("date")}/>
					</Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Pohlaví</h2>
					<StaticComboBox {...this.createFieldProps("gender")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Biografická poznámka</h2>
					<TextField {...this.createFieldProps("bibliographical_note")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Životopis</h2>
					<TextField {...this.createFieldProps("cv")}/>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Obor působnosti</h2>
					<Multiplier><TextField {...this.createFieldProps("domain_branch")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Příslušnost k zemi</h2>
					<Multiplier><GeographicComboBox {...this.createFieldProps("related_country")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Určení jazykové oblasti</h2>
					<Multiplier><StaticComboBox {...this.createFieldProps("language_country")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vztahy a události</h2>
					<Multiplier><PersonComboBox {...this.createFieldProps("parents")}/></Multiplier>
					<Multiplier><PersonComboBox {...this.createFieldProps("siblings")}/></Multiplier>
					<Multiplier><FamilyComboBox {...this.createFieldProps("family")}/></Multiplier>
					<Multiplier><CorporationComboBox {...this.createFieldProps("membreship")}/></Multiplier>
					<Multiplier><KeywordComboBox {...this.createFieldProps("employment")}/></Multiplier>
					<Multiplier><CorporationComboBox {...this.createFieldProps("affiliation")}/></Multiplier>
					<Multiplier><CreationComboBox {...this.createFieldProps("important_subject")}/></Multiplier>
					<Multiplier><SubjectComboBox {...this.createFieldProps("important_event")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("marriage_start")}/></Multiplier>
					<Multiplier><TextField {...this.createFieldProps("marriage_end")}/></Multiplier>
					<Multiplier><CorporationComboBox {...this.createFieldProps("study")}/></Multiplier>
				</Paper>
				<Paper className={styles.dataBlock}> <h2>Vyobrazení</h2>
					<Multiplier><MetadataComboBox {...this.createFieldProps("arm")}/></Multiplier>
					<Multiplier><MetadataComboBox {...this.createFieldProps("photo")}/></Multiplier>
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
					<StaticOpenComboBox  {...this.createFieldProps("submitter")}/>
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Person))