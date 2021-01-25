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
//	CreationComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
//	StaticOpenComboBox,
	SubmitterComboBox,
} from '../comboBoxes'
import IndexParent from "./indexParent"
import styles from './parent.module.scss'
import GPSField from "../validationTextFields/GPSField"
import typeDefinitionFile from './corporationTypes.json'
import Multiplier from '../Multiplier'
import MetadataComboBox from "components/comboBoxes/MetadataComboBox"
import FoldablePaper from "../../components/FoldablePaper"
import UniqueTextField from "../../components/UniqueTextField"
import UploadFile from "../../components/UploadFile"

class Corporation extends IndexParent {
	constructor(props){
		super(props)

		this.state = {
			helpersVisible: false,
		}

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
					{this.props.defaults
						? <h1>Editace záznamu v Rejstříku korporací</h1>
						: <h1>Nový záznam do Rejstříku korporací</h1>
					}
					<Tooltip title={"Schovat nápovědy"}>
						<HelpOutline className={styles.allHelpers} onClick={()=>this.setState({helpersVisible: !this.state.helpersVisible}) }/>
					</Tooltip>
				</Paper>
				<div className={styles.body}>
					<FoldablePaper className={styles.dataBlock}> <h2>Preferované označení</h2>
						<UniqueTextField {...this.createFieldProps("name_main_part")} uniqueSource="CorporationIndex" uniqueField="name_main_part"/>
						<Multiplier><TextField {...this.createFieldProps("name_other_part")}/></Multiplier>
						<TextField {...this.createFieldProps("jurisdiction")}/>
						<KeywordComboBox {...this.createFieldProps("general_complement")}/>
						<GeographicComboBox {...this.createFieldProps("geographical_complement")}/>
						<TextField {...this.createFieldProps("chronological_complement")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Variantní označení</h2>

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
							<TextField {...this.createFieldProps("historical_name")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_historical")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_historical")}/>
							<TextField {...this.createFieldProps("chronological_complement_historical")}/>
						</Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("other_name_form")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_other_name")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_other_name")}/>
							<TextField {...this.createFieldProps("chronological_complement_other_name")}/>
						</Multiplier>
						<Multiplier>
							<TextField {...this.createFieldProps("following_name")}/>
							<KeywordComboBox {...this.createFieldProps("general_complement_following")}/>
							<GeographicComboBox {...this.createFieldProps("geographical_complement_following")}/>
							<TextField {...this.createFieldProps("chronological_complement_following")}/>
						</Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Popis</h2>
						<TextField {...this.createFieldProps("brief_characteristic")}/>
						<TextField {...this.createFieldProps("history")}/>
						<TextField {...this.createFieldProps("function")}/>
						<Multiplier><TextField {...this.createFieldProps("constitutive_standards")}/></Multiplier>
						<Multiplier><TextField {...this.createFieldProps("scope_standards")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Souřadnice</h2>
						<GPSField {...this.createFieldProps("coordinates")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vztahy a události</h2>
						<Multiplier><CorporationComboBox {...this.createFieldProps("parent_corporation")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("part_of")}/></Multiplier>
						<Multiplier><CorporationComboBox {...this.createFieldProps("precedent_corporation")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("related_country")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Počátek existence</h2>
						<PersonComboBox {...this.createFieldProps("founder")}/>
						<TextField {...this.createFieldProps("founding_document")}/>
						<GeographicComboBox {...this.createFieldProps("founding_place")}/>
						<TextField {...this.createFieldProps("founding_chronological_specification")}/>
						<TextField {...this.createFieldProps("registration_subject")}/>
						<SubjectComboBox {...this.createFieldProps("registration_event")}/>
						<TextField {...this.createFieldProps("registration_chronological_specification")}/>
						<PersonComboBox {...this.createFieldProps("cleavage_person")}/>
						<TextField {...this.createFieldProps("cleavage_document")}/>
						<GeographicComboBox {...this.createFieldProps("cleavage_place")}/>
						<TextField {...this.createFieldProps("cleavage_chronological_specification")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Konec existence</h2>
						<PersonComboBox {...this.createFieldProps("cancellation_person")}/>
						<TextField {...this.createFieldProps("cancellation_document")}/>
						<GeographicComboBox {...this.createFieldProps("cancellation_place")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
						<TextField {...this.createFieldProps("delete_from_evidence_subject")}/>
						<SubjectComboBox {...this.createFieldProps("delete_from_evidence_event")}/>
						<TextField {...this.createFieldProps("cancellation_chronological_specification")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Zařazení</h2>
						<Multiplier><KeywordComboBox {...this.createFieldProps("category")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("domain_scope")}/></Multiplier>
						<Multiplier><GeographicComboBox {...this.createFieldProps("geographical_scope")}/></Multiplier>
						<Multiplier><KeywordComboBox {...this.createFieldProps("characteristic")}/></Multiplier>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Vyobrazení</h2>
						<Multiplier><MetadataComboBox {...this.createFieldProps("logo")}/></Multiplier>
						<Multiplier><MetadataComboBox {...this.createFieldProps("mark")}/></Multiplier>
						<Multiplier><MetadataComboBox {...this.createFieldProps("flag")}/></Multiplier>
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
						<SubmitterComboBox {...this.createFieldProps("submitter")}/>
					</FoldablePaper>
					<FoldablePaper className={styles.dataBlock}> <h2>Přílohy</h2>
						<Multiplier>
							<UploadFile {...this.createFieldProps("attachment_url")}/>
							<TextField {...this.createFieldProps("attachment_description")}/>
						</Multiplier>
					</FoldablePaper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Corporation))