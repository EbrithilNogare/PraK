import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import {
	Paper,
	Select,
	TextField,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Checkbox,
} from '@material-ui/core'

import {
	MetadataComboBox,
	CorporationComboBox,
	CreationComboBox,
//	FamilyComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
	StaticOpenComboBox,
	StaticComboBox,
	FormStaticComboBox,
} from '../comboBoxes'
import ISBNField from '../validationTextFields/ISBNField'
import DateField from '../validationTextFields/DateField'
import DoubleSlider from '../DoubleSlider'

import IndexParent from "./indexParent"

import styles from './parent.module.scss'

import metadataTypes from './metadataTypes.json'

class Metadata extends IndexParent {
	constructor(props){
		super(props)

		this.state = {
			documentType: 0
		}

		this.formData = {}

		this.indexURL = "metadata"
	}

	conditionalField(fieldName){
		return metadataTypes.properties[fieldName].fields[this.state.documentType] === 1
	}

	getTranslation(fieldName){
		return metadataTypes.properties[fieldName].label || ""
	}
	getHelper(fieldName){
		return metadataTypes.properties[fieldName].helper || ""
	}
	getSchema(fieldName){
		return metadataTypes.properties[fieldName].schema
	}

	createFieldProps(name){
		const toReturn = {
			label:this.getTranslation(name),
			onChange:e=>{this.handleFormChange(e, this.getSchema(name))},
			InputProps:this.helperProp(this.getHelper(name)),
		}

		if(metadataTypes.properties[name].options)
			toReturn.data = metadataTypes.properties[name].options

		if(metadataTypes.properties[name].required)
			toReturn.required = true
			
		if(metadataTypes.properties[name].type)
			toReturn.type = metadataTypes.properties[name].type

		return toReturn
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault()}}
			>
				<Paper className={styles.header}>
					<h1>Nový záznam do Rejstříku metadat</h1>
				</Paper>
				<div className={styles.body}>
				<Paper className={styles.dataBlock}>
					<FormControl>
						<InputLabel id="selectTypeLabel">Type</InputLabel>
						<Select
							labelId="selectTypeLabel"
							name="documentType"
							value={this.state.documentType}
							onChange={(e) => {
								this.setState({documentType: e.target.value})
								this.formData.documentType = e.target.value
							}}
						>
							{metadataTypes.types.map((value, index) => {
								return <MenuItem key={index} value={index}>{value}</MenuItem>
							})}
						</Select>
					</FormControl>
				</Paper>
				<Paper className={styles.dataBlock}>
					{this.conditionalField("author") && <PersonComboBox {...this.createFieldProps("author")}/>}
					{this.conditionalField("author_role") && <StaticComboBox {...this.createFieldProps("author_role")}/>}
					{this.conditionalField("other_authors") && <PersonComboBox {...this.createFieldProps("other_authors")}/>}
					{this.conditionalField("other_authors_role") && <StaticComboBox {...this.createFieldProps("other_authors_role")}/>}
					{this.conditionalField("name") && <TextField {...this.createFieldProps("name")}/>}
					{this.conditionalField("other_names") && <TextField {...this.createFieldProps("other_names")}/>}
					{this.conditionalField("language") && <StaticOpenComboBox {...this.createFieldProps("language")}/>}
					{this.conditionalField("publish_country") && <StaticComboBox{...this.createFieldProps("publish_country")}/>}
					{this.conditionalField("publish_place") && <GeographicComboBox {...this.createFieldProps("publish_place")}/>}
					{this.conditionalField("publisher") && <CorporationComboBox {...this.createFieldProps("publisher")}/>}
					{this.conditionalField("publishing_date") && <DateField {...this.createFieldProps("publishing_date")}/>}
					{this.conditionalField("publishing_date_note") && <TextField  {...this.createFieldProps("publishing_date_note")}/>}
					{this.conditionalField("publishing_date") && <div> { this.getTranslation("publishing_date_notAccurate") }
						<Checkbox 
							color="primary"
							onChange = { e => this.handleCheckboxChange(e, this.getSchema("publishing_date_notAccurate")) }
						/>
					</div>}
				</Paper>
				<Paper className={styles.dataBlock}>
					{this.conditionalField("isbn") && <ISBNField {...this.createFieldProps("isbn")}/>}
					{this.conditionalField("edition_order") && <TextField  {...this.createFieldProps("edition_order")}/>}
					{this.conditionalField("edition") && <TextField  {...this.createFieldProps("edition")}/>}
					{this.conditionalField("action_name") && <CorporationComboBox  {...this.createFieldProps("action_name")}/>}
					{this.conditionalField("volume_content") && <CorporationComboBox  {...this.createFieldProps("volume_content")}/>}
					{this.conditionalField("volume_content") && <GeographicComboBox  {...this.createFieldProps("volume_content")}/>}
					{this.conditionalField("publishing_year_from") && <TextField {...this.createFieldProps("publishing_year_from")}/>}
					{this.conditionalField("publishing_year_to") && <TextField  {...this.createFieldProps("publishing_year_to")}/>}
					{this.conditionalField("publishing_year_note") && <TextField  {...this.createFieldProps("publishing_year_note")}/>}
					{this.conditionalField("periodicity") && <StaticOpenComboBox  {...this.createFieldProps("periodicity")}/>}
					{this.conditionalField("isbn") && <TextField  {...this.createFieldProps("isbn")}/>}
					{this.conditionalField("source_document_name") && <TextField  {...this.createFieldProps("source_document_name")}/>}
					{this.conditionalField("year") && <TextField  {...this.createFieldProps("year")}/>}
					{this.conditionalField("volume") && <TextField  {...this.createFieldProps("volume")}/>}
					{this.conditionalField("number") && <TextField  {...this.createFieldProps("number")}/>}
					{this.conditionalField("date") && <DateField  {...this.createFieldProps("date")}/>}
				</Paper>
				<Paper className={styles.dataBlock}>
					{this.conditionalField("corporation_name") && <CorporationComboBox {...this.createFieldProps("corporation_name")}/>}
					{this.conditionalField("access_conditions") && <StaticOpenComboBox  {...this.createFieldProps("access_conditions")}/>}
					{this.conditionalField("acces_note") && <TextField  {...this.createFieldProps("acces_note")}/>}
					{this.conditionalField("location_in_institution") && <CorporationComboBox {...this.createFieldProps("location_in_institution")}/>}
					{this.conditionalField("location_in_fund") && <TextField  {...this.createFieldProps("location_in_fund")}/>}
					{this.conditionalField("location_note") && <TextField  {...this.createFieldProps("location_note")}/>}
					{this.conditionalField("digitized_document_url") && <TextField  {...this.createFieldProps("digitized_document_url")}/>}
					{this.conditionalField("external_source_name") && <TextField  {...this.createFieldProps("external_source_name")}/>}
					{this.conditionalField("external_source_url") && <TextField  {...this.createFieldProps("external_source_url")}/>}
					{this.conditionalField("url_leading_to_document") && <TextField  {...this.createFieldProps("url_leading_to_document")}/>}
					{this.conditionalField("attachment_name") && <TextField  {...this.createFieldProps("attachment_name")}/>}
					{this.conditionalField("attachment_url") && <TextField  {...this.createFieldProps("attachment_url")}/>}
					{this.conditionalField("described_object_citation") && <TextField  {...this.createFieldProps("described_object_citation")}/>}
					{this.conditionalField("previous_name") && <MetadataComboBox  {...this.createFieldProps("previous_name")}/>}
					{this.conditionalField("following_name") && <MetadataComboBox  {...this.createFieldProps("following_name")}/>}
				</Paper>
				<Paper className={styles.dataBlock}>
					{this.conditionalField("form") && <FormStaticComboBox  {...this.createFieldProps("form")}/>}
					{this.conditionalField("range") && <TextField  {...this.createFieldProps("range")}/>}
					{this.conditionalField("dimension") && <TextField {...this.createFieldProps("dimension")}/>} 
					{this.conditionalField("map_scale") && <TextField {...this.createFieldProps("map_scale")}/>} 
					{this.conditionalField("format") && <KeywordComboBox  {...this.createFieldProps("format")}/>}
					{this.conditionalField("processing_level") && <StaticOpenComboBox  {...this.createFieldProps("processing_level")}/>}
					{this.conditionalField("description_level") && <StaticOpenComboBox  {...this.createFieldProps("description_level")}/>}
					{this.conditionalField("archival_aids") && <TextField {...this.createFieldProps("archival_aids")}/>} 
					{this.conditionalField("source_citation") && <TextField {...this.createFieldProps("source_citation")}/>} 
					{this.conditionalField("multiple_placement") && <TextField {...this.createFieldProps("multiple_placement")}/>} 
					{this.conditionalField("multiple_placement_url") && <TextField {...this.createFieldProps("multiple_placement_url")}/>} 
					{this.conditionalField("topic") && <SubjectComboBox {...this.createFieldProps("topic")}/>} 
					{this.conditionalField("topic") && <CreationComboBox {...this.createFieldProps("topic")}/>} 
					{this.conditionalField("corporation_content_specification") && <PersonComboBox {...this.createFieldProps("corporation_content_specification")}/>} 
					{this.conditionalField("corporation_content_specification") && <CorporationComboBox {...this.createFieldProps("corporation_content_specification")}/>} 
					{this.conditionalField("chronological_content_specification") && <DoubleSlider {...this.createFieldProps("chronological_content_specification")}
						BeginLabel="Začátek"
						EndLabel="Konec"
						defaultValue={[0,0]}
						min={1900}
						max={(new Date()).getFullYear()+10}
						onChange={(e)=>{
							this.handleFormChange({...e, target:{...e.target, value: e.target.value[0]}}, "chronological_content_specification.begin")
							this.handleFormChange({...e, target:{...e.target, value: e.target.value[1]}}, "chronological_content_specification.end")
						}}
					/>}
					{this.conditionalField("geographical_content_specification") && <GeographicComboBox {...this.createFieldProps("geographical_content_specification")}/>}
					{this.conditionalField("keywords") && <KeywordComboBox  {...this.createFieldProps("keywords")}/>}
					{this.conditionalField("description") && <TextField  {...this.createFieldProps("description")}/>}
				</Paper>
				<Paper className={styles.dataBlock}>
					{this.conditionalField("general_note") && <TextField multiline {...this.createFieldProps("general_note")}/>}
					{this.conditionalField("editor_note") && <TextField  {...this.createFieldProps("editor_note")}/>}
					{this.conditionalField("submitter") && <StaticOpenComboBox  {...this.createFieldProps("submitter")}/>}
				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
			</form>
		)
	}
}

export default withSnackbar(withRouter(Metadata))