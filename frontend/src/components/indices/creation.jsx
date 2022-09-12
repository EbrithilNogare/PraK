import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'
import { 
	TextField,
	Button,
	Paper,
	Tooltip,
} from '@material-ui/core'
import {
	HelpOutline
} from '@material-ui/icons'

import {
	CorporationComboBox,
	CreationComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
	SubmitterComboBox,
	StaticComboBox,
} from '../comboBoxes'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import GPSField from "../validationTextFields/GPSField"
import typeDefinitionFile from './creationTypes.json'
import Multiplier from '../Multiplier'
import FoldablePaper from "../../components/FoldablePaper"
import UniqueTextField from "../../components/UniqueTextField"
import UploadFile from "../../components/UploadFile"

class Creation extends IndexParent {
	constructor(props){
		super(props)

		this.state = {
			helpersVisible: false,
		}

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
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku dílo/výtvor</h1>
						: <h1>Nový záznam do Rejstříku dílo/výtvor</h1>
					}
					<Tooltip title={"Zobrazit / Schovat nápovědy"}>
						<HelpOutline className={styles.allHelpers} onClick={()=>this.setState({helpersVisible: !this.state.helpersVisible}) }/>
					</Tooltip>
				</Paper>
				<div className={styles.body}>
					<FoldablePaper className={styles.dataBlock}> <h2>Preferované označení</h2>
						<UniqueTextField {...this.createFieldProps("name_main_part")} uniqueSource="CreationIndex" uniqueField="name_main_part"/>
						<Multiplier><TextField {...this.createFieldProps("name_other_part")}/></Multiplier>
						<KeywordComboBox {...this.createFieldProps("general_complement")}/>
						<GeographicComboBox {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Variantní označení</h2>
						<Multiplier>
							<StaticComboBox {...this.createFieldProps("variant_type")}/>
							<TextField {...this.createFieldProps("variant_value")}/>
							<KeywordComboBox {...this.createFieldProps("variant_general_complement")}/>
							<GeographicComboBox {...this.createFieldProps("variant_geographical_complement")}/>
							<TextField {...this.createFieldProps("variant_chronological_complement")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Popis</h2>
						<TextField {...this.createFieldProps("brief_characteristic")}/>
						<TextField {...this.createFieldProps("description")}/>
						<TextField {...this.createFieldProps("geographical_description")}/>
						<TextField {...this.createFieldProps("history")}/>
						<TextField {...this.createFieldProps("purpose")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Souřadnice</h2>
						<Multiplier><GPSField {...this.createFieldProps("coordinates")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vztahy</h2>
						<Multiplier><CreationComboBox {...this.createFieldProps("superordinate_relations")}/></Multiplier>
						<Multiplier><CreationComboBox {...this.createFieldProps("subordinate_relations")}/></Multiplier>
						<Multiplier><CreationComboBox {...this.createFieldProps("associative_relations")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("locality")}/></Multiplier>
						<h3>Pojmenováno po</h3>
						<Multiplier><PersonComboBox {...this.createFieldProps("related_person")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("related_corporation")}/></Multiplier>
						<Multiplier><SubjectComboBox {...this.createFieldProps("related_event")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("related_location")}/></Multiplier>
						<Multiplier><PersonComboBox {...this.createFieldProps("owner_person")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("owner_corporation")}/></Multiplier>
						<Multiplier><CreationComboBox {...this.createFieldProps("related_creation")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vznik/ počátek existence</h2>
						<PersonComboBox {...this.createFieldProps("founding_person")}/>
						<CorporationComboBox {...this.createFieldProps("founding_corporation")}/>
						<GeographicComboBox {...this.createFieldProps("first_mention_place")}/>
						<TextField {...this.createFieldProps("first_mention_subject")}/>
						<TextField {...this.createFieldProps("founding_chronological_specification")}/>
						<SubjectComboBox {...this.createFieldProps("first_realization_event")}/>
						<TextField {...this.createFieldProps("first_realization_subject")}/>
						<TextField {...this.createFieldProps("first_realization_chronological_specification")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Konec existence</h2>
						<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
						<CorporationComboBox {...this.createFieldProps("cancellation_corporation")}/>
						<GeographicComboBox {...this.createFieldProps("last_mention_place")}/>
						<TextField {...this.createFieldProps("last_mention_subject")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
						<SubjectComboBox {...this.createFieldProps("last_realization_event")}/>
						<TextField {...this.createFieldProps("last_realization_subject")}/>
						<TextField {...this.createFieldProps("last_realization_chronological_specification")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Změna</h2>
						<Multiplier><PersonComboBox {...this.createFieldProps("document_change_person")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("document_change_corporation")}/></Multiplier>
						<Multiplier><PersonComboBox {...this.createFieldProps("ownership_change_person")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("ownership_change_corporation")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("location_change")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("change_chronological_specification")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Zařazení</h2>
						<Multiplier><KeywordComboBox {...this.createFieldProps("category")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("topic")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("characteristic")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Poznámky</h2>
						<Multiplier><TextField {...this.createFieldProps("public_note")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("nonpublic_note")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Jiný zdroj</h2>
						<Multiplier>
							<TextField {...this.createFieldProps("other_source_name")}/>
							<TextField {...this.createFieldProps("other_source_id")}/>
							<TextField {...this.createFieldProps("other_source_identificator")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Zdroje o heslu</h2>
						<Multiplier><TextField {...this.createFieldProps("record_sources")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("editor_note")}/></Multiplier>
						<SubmitterComboBox  {...this.createFieldProps("submitter")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Přílohy</h2>
						<Multiplier>
							<UploadFile {...this.createFieldProps("attachment_url")}/>
							<TextField {...this.createFieldProps("attachment_description")}/>
						</Multiplier>
					</FoldablePaper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="secondary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Creation))