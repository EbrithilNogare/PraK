import React from "react"
import { withRouter } from 'react-router-dom'
import { withSnackbar } from 'notistack'

import { 
	Paper,
	Select,
	TextField,
//	Table,
//	TableBody,
//	TableCell,
//	TableContainer,
//	TableHead,
//	TableRow,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
//	Typography,
//	CardContent,
} from '@material-ui/core'

import {
	CorporationComboBox,
	//	CreationComboBox,
	//	FamilyComboBox,
	GeographicComboBox,
//	KeywordComboBox,
	PersonComboBox,
	//	SubjectComboBox,
} from '../comboBoxes'

import IndexParent from "./indexParent"

import ISBNField from '../validationTextFields/ISBNField'

import styles from './parent.module.scss'

import metadataTypes from './metadataTypes.json'

class Metadata extends IndexParent {
	constructor(props){
		super(props)
		
		this.state = {
			documentType: 0,
			language: "",
			publish_country: "",
		}	
		this.indexURL = "metadata"

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	conditionalField(fieldName){
		return metadataTypes.properties[fieldName].fields[this.state.documentType] === 1
	}

	getTranslation(fieldName){
		return metadataTypes.properties[fieldName].label
	}
	
	getDataReady = (elements) => {
		const data = {}
		const errors = []
		
		for(let element of elements)
			if(element.name && element.value !== ""){
				if(element.getAttribute("aria-invalid")==="true")
					errors.push(`Incorrect format of: ${element.name}`)
				data[element.name] = element.hasAttribute("realvalue") ? element.getAttribute("realvalue") : element.value
			}
		return {data, errors}
	}	

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
			>
				<Paper className={styles.doubledataBlock}>
					<h1>Nový záznam do Rejstříku metadat</h1>
				</Paper>	
				<Paper className={[styles.doubledataBlock,styles.dataBlock].join(' ')}>
					<FormControl>
						<InputLabel id="selectTypeLabel">Type</InputLabel>
						<Select
							labelId="selectTypeLabel"
							name="documentType"
							value={this.state.documentType}
							onChange={this.handleChange}
						>
							{metadataTypes.types.map((value, index) => {
								return <MenuItem key={index} value={index}>{value}</MenuItem>
							})}
						</Select>
					</FormControl>
				</Paper>					
				<Paper className={styles.dataBlock}>
					{this.conditionalField("author") && 
						<PersonComboBox name="author" label={this.getTranslation("author")}/>
					}
					{this.conditionalField("author_role") && 
						<TextField name="author_role" label={this.getTranslation("author_role")}/>
					}	
					{this.conditionalField("other_authors") && 
						<PersonComboBox name="other_authors" label={this.getTranslation("other_authors")}/>
					}	
					{this.conditionalField("other_authors_role") && 
						<TextField name="other_authors_role" label={this.getTranslation("other_authors_role")}/>
					}					
					{this.conditionalField("name") && 
						<TextField required name="name" label={this.getTranslation("name")}/>
					}					
					{this.conditionalField("other_names") && 
						<TextField name="other_names" label={this.getTranslation("other_names")}/>
					}					
					{this.conditionalField("language") && 
						<FormControl>
							<InputLabel id="selectLanguageLabel">{this.getTranslation("language")}</InputLabel>
							<Select
								labelId="selectLanguageLabel"
								name="language"
								value={this.state.language}
								onChange={this.handleChange}
							>
								{
									metadataTypes.properties["language"].options.map((value, index) => {
										return <MenuItem key={index} value={value}>{value}</MenuItem>
								})}
							</Select>
						</FormControl>
					}					
					{this.conditionalField("publish_country") && 
						<FormControl>
							<InputLabel id="selectPublish_countryLabel">{this.getTranslation("publish_country")}</InputLabel>
							<Select
								labelId="selectPublish_countryLabel"
								name="publish_country"
								value={this.state.publish_country}
								onChange={this.handleChange}
							>
								{
									metadataTypes.properties["publish_country"].options.map((value, index) => {
										return <MenuItem key={index} value={value}>{value}</MenuItem>
								})}
							</Select>
						</FormControl>
					}					
					{this.conditionalField("publish_place") && 
						<TextField name="publish_place" label={this.getTranslation("publish_place")}/>
					}					
					{this.conditionalField("publisher") && 
						<TextField name="publisher" label={this.getTranslation("publisher")}/>
					}					
					{this.conditionalField("publishing_date") && 
						<TextField type="number" name="publishing_date" label={this.getTranslation("publishing_date")}/>
					}					
					{this.conditionalField("publishing_date_note") && 
						<TextField name="publishing_date_note" label={this.getTranslation("publishing_date_note")}/>
					}					

					</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("isbn") && 
					<ISBNField name="isbn" label={this.getTranslation("isbn")}/>
				}					
				{this.conditionalField("edition_order") && 
					<TextField name="edition_order" label={this.getTranslation("edition_order")}/>
				}					
				{this.conditionalField("edition") && 
					<TextField name="edition" label={this.getTranslation("edition")}/>
				}					
				{this.conditionalField("action_name") && 
					<TextField name="action_name" label={this.getTranslation("action_name")}/>
				}					
				{this.conditionalField("volume_content") && 
					<TextField name="volume_content" label={this.getTranslation("volume_content")}/>
				}					
				{this.conditionalField("publishing_year_from") && 
					<TextField name="publishing_year_from" label={this.getTranslation("publishing_year_from")}/>
				}					
				{this.conditionalField("publishing_year_to") && 
					<TextField name="publishing_year_to" label={this.getTranslation("publishing_year_to")}/>
				}					
				{this.conditionalField("publishing_year_note") && 
					<TextField name="publishing_year_note" label={this.getTranslation("publishing_year_note")}/>
				}					
				{this.conditionalField("periodicity") && 
					<TextField name="periodicity" label={this.getTranslation("periodicity")}/>
				}					
				{this.conditionalField("issn") && 
					<TextField name="issn" label={this.getTranslation("issn")}/>
				}					
				{this.conditionalField("source_document_name") && 
					<TextField name="source_document_name" label={this.getTranslation("source_document_name")}/>
				}					
				{this.conditionalField("year") && 
					<TextField name="year" label={this.getTranslation("year")}/>
				}					
				{this.conditionalField("volume") && 
					<TextField name="volume" label={this.getTranslation("volume")}/>
				}					
				{this.conditionalField("number") && 
					<TextField name="number" label={this.getTranslation("number")}/>
				}					
				{this.conditionalField("date") && 
					<TextField name="date" label={this.getTranslation("date")}/>
				}					

				</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("corporation_name") && 
					<CorporationComboBox name="corporation_name" label={this.getTranslation("corporation_name")}/>
				}					
				{this.conditionalField("access_conditions") && 
					<TextField name="access_conditions" label={this.getTranslation("access_conditions")}/>
				}					
				{this.conditionalField("acces_note") && 
					<TextField name="acces_note" label={this.getTranslation("acces_note")}/>
				}					
				{this.conditionalField("location_in_institution") && 
					<TextField name="location_in_institution" label={this.getTranslation("location_in_institution")}/>
				}					
				{this.conditionalField("location_in_fund") && 
					<TextField name="location_in_fund" label={this.getTranslation("location_in_fund")}/>
				}					
				{this.conditionalField("location_note") && 
					<TextField name="location_note" label={this.getTranslation("location_note")}/>
				}					
				{this.conditionalField("digitized_document_url") && 
					<TextField name="digitized_document_url" label={this.getTranslation("digitized_document_url")}/>
				}					
				{this.conditionalField("external_source_name") && 
					<TextField name="external_source_name" label={this.getTranslation("external_source_name")}/>
				}					
				{this.conditionalField("external_source_url") && 
					<TextField name="external_source_url" label={this.getTranslation("external_source_url")}/>
				}					
				{this.conditionalField("url_leading_to_document") && 
					<TextField name="url_leading_to_document" label={this.getTranslation("url_leading_to_document")}/>
				}					
				{this.conditionalField("attachment_name") && 
					<TextField name="attachment_name" label={this.getTranslation("attachment_name")}/>
				}					
				{this.conditionalField("attachment_url") && 
					<TextField name="attachment_url" label={this.getTranslation("attachment_url")}/>
				}					
				{this.conditionalField("source_object_citation") && 
					<TextField name="source_object_citation" label={this.getTranslation("source_object_citation")}/>
				}					
				{this.conditionalField("previous_name") && 
					<TextField name="previous_name" label={this.getTranslation("previous_name")}/>
				}					
				{this.conditionalField("following_name") && 
					<TextField name="following_name" label={this.getTranslation("following_name")}/>
				}						

				</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("form") && 
					<TextField name="form" label={this.getTranslation("form")}/>
				}						
				{this.conditionalField("range") && 
					<TextField name="range" label={this.getTranslation("range")}/>
				}						
				{this.conditionalField("dimension") && 
					<TextField name="dimension" label={this.getTranslation("dimension")}/>
				}						
				{this.conditionalField("map_scale") && 
					<TextField name="map_scale" label={this.getTranslation("map_scale")}/>
				}						
				{this.conditionalField("format") && 
					<TextField name="format" label={this.getTranslation("format")}/>
				}						
				{this.conditionalField("processing_level") && 
					<TextField name="processing_level" label={this.getTranslation("processing_level")}/>
				}						
				{this.conditionalField("description_level") && 
					<TextField name="description_level" label={this.getTranslation("description_level")}/>
				}						
				{this.conditionalField("archival_aids") && 
					<TextField name="archival_aids" label={this.getTranslation("archival_aids")}/>
				}
				{this.conditionalField("source_document_citation") && 
					<TextField name="source_document_citation" label={this.getTranslation("source_document_citation")}/>
				}
				{this.conditionalField("multiple_placement") && 
					<TextField name="multiple_placement" label={this.getTranslation("multiple_placement")}/>
				}						
				{this.conditionalField("multiple_placement_url") && 
					<TextField name="multiple_placement_url" label={this.getTranslation("multiple_placement_url")}/>
				}						
				{this.conditionalField("topic") && 
					<TextField name="topic" label={this.getTranslation("topic")}/>
				}						
				{this.conditionalField("corporation_content_specification") && 
					<TextField name="corporation_content_specification" label={this.getTranslation("corporation_content_specification")}/>
				}						
				{this.conditionalField("chronological_content_specification") && 
					<TextField name="chronological_content_specification" label={this.getTranslation("chronological_content_specification")}/>
				}						
				{this.conditionalField("geographical_content_specification") && 
					<GeographicComboBox name="geographical_content_specification" label={this.getTranslation("geographical_content_specification")}/>
				}						
				{this.conditionalField("keywords") && 
					<TextField name="keywords" label={this.getTranslation("keywords")}/>
				}						
				{this.conditionalField("description") && 
					<TextField name="description" label={this.getTranslation("description")}/>
				}						

				</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("general_note") && 
					<TextField name="general_note" label={this.getTranslation("general_note")}/>
				}						
				{this.conditionalField("editor_note") && 
					<TextField name="editor_note" label={this.getTranslation("editor_note")}/>
				}						
				{this.conditionalField("submitter") && 
					<TextField required name="submitter" label={this.getTranslation("submitter")}/>
				}						

				</Paper>

				<Button type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
				{/*
				<Paper className={[styles.doubledataBlock,styles.dataBlock].join(' ')}>
					<TableContainer>
						<CardContent>
							<Typography gutterBottom variant="h5">
								Duplicates match
							</Typography>
						</CardContent>						
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Percents</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Title</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Inserted</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
							
								<TableRow>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
								</TableRow>

							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
				*/}
			</form>
		)
	}
}

export default withSnackbar(withRouter(Metadata))