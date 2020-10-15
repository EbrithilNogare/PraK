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
} from '@material-ui/core'

import {
	MetadataComboBox,
	CorporationComboBox,
	CreationComboBox,
	FamilyComboBox,
	GeographicComboBox,
	KeywordComboBox,
	PersonComboBox,
	SubjectComboBox,
} from '../comboBoxes'
import ISBNField from '../validationTextFields/ISBNField'
import DateField from '../validationTextFields/DateField'

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
		return metadataTypes.properties[fieldName].label
	}

	render(){
		return(
			<form
				onSubmit={this.handleSubmit}
				className={styles.main}
				onKeyPress={event => { if (event.which === 13) event.preventDefault() }}
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
					{this.conditionalField("author") && <PersonComboBox 
						label={this.getTranslation("author")}
						onChange={e=>{this.handleFormChange(e, "author.id")}}/>
					}
					{this.conditionalField("author_role") && <TextField
						label={this.getTranslation("author_role")}
						onChange={e=>{this.handleFormChange(e, "author.role")}}/>
					}
					{this.conditionalField("other_authors") && <PersonComboBox
						label={this.getTranslation("other_authors")}
						onChange={e=>{this.handleFormChange(e, "other_authors.id")}}/>
					}
					{this.conditionalField("other_authors_role") && <TextField
						label={this.getTranslation("other_authors_role")}
						onChange={e=>{this.handleFormChange(e, "other_authors.role")}}/>
					}
					{this.conditionalField("name") && <TextField
						required
						label={this.getTranslation("name")}
						onChange={e=>{this.handleFormChange(e, "name")}}/>
					}
					{this.conditionalField("other_names") && <TextField 
						label={this.getTranslation("other_names")} 
						onChange={e=>{this.handleFormChange(e, "other_names")}}/>
					}
					{this.conditionalField("language") &&
						<FormControl>
							<InputLabel id="selectLanguageLabel">{this.getTranslation("language")}</InputLabel>
							<Select
								labelId="selectLanguageLabel"
								defaultValue=""
								onChange={e=>{this.handleFormChange(e, "language")}}
							>
								{metadataTypes.properties["language"].options.map((value, index) => 
									<MenuItem key={index} value={value}>{value}</MenuItem>
								)}
							</Select>
						</FormControl>
					}
					{this.conditionalField("publish_country") && <GeographicComboBox
							label={this.getTranslation("publish_country")}
							onChange={e=>{this.handleFormChange(e, "publish_country")}}/>
					}
					{this.conditionalField("publish_place") && <GeographicComboBox 
						label={this.getTranslation("publish_place")} 
						onChange={e=>{this.handleFormChange(e, "publish_place")}}/>
					}
					{this.conditionalField("publisher") && <CorporationComboBox 
						label={this.getTranslation("publisher")} 
						onChange={e=>{this.handleFormChange(e, "publisher")}}/>
					}
					{this.conditionalField("publishing_date") && <DateField
						label={this.getTranslation("publishing_date")}
						onChange={e=>{this.handleFormChange(e, "publishing_date.date")}}/>
					}
					{this.conditionalField("publishing_date_note") && <TextField 
						label={this.getTranslation("publishing_date_note")} 
						onChange={e=>{this.handleFormChange(e, "publishing_date.note")}}/>
					}

					</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("isbn") && <ISBNField
					label={this.getTranslation("isbn")}
					onChange={e=>{this.handleFormChange(e, "isbn")}}/>
				}
				{this.conditionalField("edition_order") && <TextField 
					label={this.getTranslation("edition_order")} 
					onChange={e=>{this.handleFormChange(e, "edition_order")}}/>
				}
				{this.conditionalField("edition") && <TextField 
					label={this.getTranslation("edition")} 
					onChange={e=>{this.handleFormChange(e, "edition")}}/>
				}
				{this.conditionalField("action_name") && <CorporationComboBox 
					label={this.getTranslation("action_name")} 
					onChange={e=>{this.handleFormChange(e, "action_name")}}/>
				}
				{this.conditionalField("volume_content") && <CorporationComboBox 
						label={this.getTranslation("volume_content") + " - Corporation"}
						onChange={e=>{this.handleFormChange(e, "volume_content"); this.formData.volume_contentModel = "corporationIndex"}}/>
				}
				{this.conditionalField("volume_content") && <GeographicComboBox 
						label={this.getTranslation("volume_content") + " - Geographic"}
						onChange={e=>{this.handleFormChange(e, "volume_content"); this.formData.volume_contentModel = "geographicIndex"}}/>
				}
				{this.conditionalField("publishing_year_from") && <TextField
					type="Number"
					label={this.getTranslation("publishing_year_from")} 
					onChange={e=>{this.handleFormChange(e, "publishing_year.from")}}/>
				}
				{this.conditionalField("publishing_year_to") && <TextField 
					type="Number"
					label={this.getTranslation("publishing_year_to")} 
					onChange={e=>{this.handleFormChange(e, "publishing_year.to")}}/>
				}
				{this.conditionalField("publishing_year_note") && <TextField 
					label={this.getTranslation("publishing_year_note")} 
					onChange={e=>{this.handleFormChange(e, "publishing_year.note")}}/>
				}
				{this.conditionalField("periodicity") && <TextField 
					label={this.getTranslation("periodicity")} 
					onChange={e=>{this.handleFormChange(e, "publishing_year.periodicity")}}/>
				}
				{this.conditionalField("isbn") && <TextField 
					label={this.getTranslation("isbn")} 
					onChange={e=>{this.handleFormChange(e, "isbn")}}/>
				}
				{this.conditionalField("source_document_name") && <TextField 
					label={this.getTranslation("source_document_name")} 
					onChange={e=>{this.handleFormChange(e, "source_document_name")}}/>
				}
				{this.conditionalField("year") && <TextField 
					type="Number"
					label={this.getTranslation("year")} 
					onChange={e=>{this.handleFormChange(e, "copies.year")}}/>
				}
				{this.conditionalField("volume") && <TextField 
					type="Number"
					label={this.getTranslation("volume")} 
					onChange={e=>{this.handleFormChange(e, "copies.volume")}}/>
				}
				{this.conditionalField("number") && <TextField 
					type="Number"
					label={this.getTranslation("number")} 
					onChange={e=>{this.handleFormChange(e, "copies.number")}}/>
				}
				{this.conditionalField("date") && <DateField 
					label={this.getTranslation("date")} 
					onChange={e=>{this.handleFormChange(e, "copies.date")}}/>
				}
				</Paper>

				<Paper className={styles.dataBlock}>
				{this.conditionalField("corporation_name") && <CorporationComboBox
					label={this.getTranslation("corporation_name")}
					onChange={e=>{this.handleFormChange(e, "corporation_name")}}/>
				}
				{this.conditionalField("access_conditions") && <TextField 
					label={this.getTranslation("access_conditions")} 
					onChange={e=>{this.handleFormChange(e, "location.access_conditions")}}/>
				}
				{this.conditionalField("acces_note") && <TextField 
					label={this.getTranslation("acces_note")} 
					onChange={e=>{this.handleFormChange(e, "location.acces_note")}}/>
				}
				{this.conditionalField("location_in_institution") && <GeographicComboBox 
					label={this.getTranslation("location_in_institution")} 
					onChange={e=>{this.handleFormChange(e, "location.institution")}}/>
				}
				{this.conditionalField("location_in_fund") && <TextField 
					label={this.getTranslation("location_in_fund")} 
					onChange={e=>{this.handleFormChange(e, "location.fund")}}/>
				}
				{this.conditionalField("location_note") && <TextField 
					label={this.getTranslation("location_note")} 
					onChange={e=>{this.handleFormChange(e, "location.note")}}/>
				}
				{this.conditionalField("digitized_document_url") && <TextField 
					label={this.getTranslation("digitized_document_url")} 
					onChange={e=>{this.handleFormChange(e, "digitized_document_url")}}/>
				}
				{this.conditionalField("external_source_name") && <TextField 
					label={this.getTranslation("external_source_name")} 
					onChange={e=>{this.handleFormChange(e, "external_source.name")}}/>
				}
				{this.conditionalField("external_source_url") && <TextField 
					label={this.getTranslation("external_source_url")} 
					onChange={e=>{this.handleFormChange(e, "external_source.url")}}/>
				}
				{this.conditionalField("url_leading_to_document") && <TextField 
					label={this.getTranslation("url_leading_to_document")} 
					onChange={e=>{this.handleFormChange(e, "external_source.url_leading_to_document")}}/>
				}
				{this.conditionalField("attachment_name") && <TextField 
					label={this.getTranslation("attachment_name")} 
					onChange={e=>{this.handleFormChange(e, "attachment.name")}}/>
				}
				{this.conditionalField("attachment_url") && <TextField 
					label={this.getTranslation("attachment_url")} 
					onChange={e=>{this.handleFormChange(e, "attachment.url")}}/>
				}
				{this.conditionalField("source_object_citation") && <TextField 
					label={this.getTranslation("source_object_citation")} 
					onChange={e=>{this.handleFormChange(e, "source_object_citation")}}/>
				}
				{this.conditionalField("previous_name") && <MetadataComboBox 
					label={this.getTranslation("previous_name")} 
					onChange={e=>{this.handleFormChange(e, "previous_name")}}/>
				}
				{this.conditionalField("following_name") && <MetadataComboBox 
					label={this.getTranslation("following_name")} 
					onChange={e=>{this.handleFormChange(e, "following_name")}}/>
				}

				</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("form") && <TextField 
					label={this.getTranslation("form")} 
					onChange={e=>{this.handleFormChange(e, "form")}}/>
				}
				{this.conditionalField("range") && <TextField 
					label={this.getTranslation("range")} 
					onChange={e=>{this.handleFormChange(e, "range")}}/>
				}
				{this.conditionalField("dimension") && <TextField 
					label={this.getTranslation("dimension")} 
					onChange={e=>{this.handleFormChange(e, "dimension")}}/>
				}
				{this.conditionalField("map_scale") && <TextField 
					label={this.getTranslation("map_scale")} 
					onChange={e=>{this.handleFormChange(e, "map_scale")}}/>
				}
				{this.conditionalField("format") && <KeywordComboBox 
					label={this.getTranslation("format")} 
					onChange={e=>{this.handleFormChange(e, "format")}}/>
				}
				{this.conditionalField("processing_level") && <TextField 
					label={this.getTranslation("processing_level")} 
					onChange={e=>{this.handleFormChange(e, "processing_level")}}/>
				}
				{this.conditionalField("description_level") && <TextField 
					label={this.getTranslation("description_level")} 
					onChange={e=>{this.handleFormChange(e, "description_level")}}/>
				}
				{this.conditionalField("archival_aids") && <TextField 
					label={this.getTranslation("archival_aids")} 
					onChange={e=>{this.handleFormChange(e, "archival_aids")}}/>
				}
				{this.conditionalField("source_document_citation") && <TextField 
					label={this.getTranslation("source_document_citation")} 
					onChange={e=>{this.handleFormChange(e, "source_document_citation")}}/>
				}
				{this.conditionalField("multiple_placement") && <TextField 
					label={this.getTranslation("multiple_placement")} 
					onChange={e=>{this.handleFormChange(e, "multiple_placement")}}/>
				}
				{this.conditionalField("multiple_placement_url") && <TextField 
					label={this.getTranslation("multiple_placement_url")} 
					onChange={e=>{this.handleFormChange(e, "multiple_placement_url")}}/>
				}
				{this.conditionalField("topic") && <SubjectComboBox 
						label={this.getTranslation("topic") + " - Subject"}
						onChange={e=>{this.handleFormChange(e, "topic"); this.formData.topicModel = "subjectIndex"}}/>
				}
				{this.conditionalField("topic") && <CreationComboBox 
						label={this.getTranslation("topic") + " - Creation"}
						onChange={e=>{this.handleFormChange(e, "topic"); this.formData.topicModel = "creationIndex"}}/>
				}
				{this.conditionalField("corporation_content_specification") && <PersonComboBox 
						label={this.getTranslation("corporation_content_specification") + " - Person"}
						onChange={e=>{this.handleFormChange(e, "corporation_content_specification"); this.formData.corporation_content_specificationModel = "personIndex"}}/>
				}
				{this.conditionalField("corporation_content_specification") && <CorporationComboBox 
						label={this.getTranslation("corporation_content_specification") + " - Corporation"}
						onChange={e=>{this.handleFormChange(e, "corporation_content_specification"); this.formData.corporation_content_specificationModel = "corporationIndex"}}/>
				}
				{this.conditionalField("chronological_content_specification") && <TextField 
					label={this.getTranslation("chronological_content_specification")} 
					onChange={e=>{this.handleFormChange(e, "chronological_content_specification")}}/>
				}
				{this.conditionalField("geographical_content_specification") && <GeographicComboBox
					label={this.getTranslation("geographical_content_specification")}
					onChange={e=>{this.handleFormChange(e, "geographical_content_specification")}}/>
				}
				{this.conditionalField("keywords") && <KeywordComboBox 
					label={this.getTranslation("keywords")} 
					onChange={e=>{this.handleFormChange(e, "keywords")}}/>
				}
				{this.conditionalField("description") && <TextField 
					label={this.getTranslation("description")} 
					onChange={e=>{this.handleFormChange(e, "description")}}/>
				}

				</Paper>
				<Paper className={styles.dataBlock}>

				{this.conditionalField("general_note") && <TextField 
					label={this.getTranslation("general_note")} 
					onChange={e=>{this.handleFormChange(e, "general_note")}}/>
				}
				{this.conditionalField("editor_note") && <TextField 
					label={this.getTranslation("editor_note")} 
					onChange={e=>{this.handleFormChange(e, "editor_note")}}/>
				}
				{this.conditionalField("submitter") && <TextField 
					required label={this.getTranslation("submitter"
					)} onChange={e=>{this.handleFormChange(e, "submitter")}}/>
				}

				</Paper>
				</div>
				<Button className={styles.footer} type="submit" variant="contained" color="primary" onClick={this.send}>Nahrát</Button>
				{/*
				<Paper className={[styles.footer,styles.dataBlock].join(' ')}>
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