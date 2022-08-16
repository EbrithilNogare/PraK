import React from "react"
import {
	withRouter,
} from "react-router-dom"
import { withSnackbar } from 'notistack'
import {
	Paper,
	Select,
	MenuItem,
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
	Typography,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import {
	PersonComboBox,
	GeographicComboBox,
	CorporationComboBox,
	MetadataComboBox,
	KeywordComboBox,
	StaticComboBox,
} from '../../components/comboBoxes'
import typeDefinitionFile from '../../components/indices/metadataTypes.json'
import DateField from '../../components/validationTextFields/DateField'
import styles from './searchScene.module.scss'

class ShowScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			indexer: "metadata",
			records: [],
			template: [
				{field: "author", headerName: "Hlavní autor", flex: 400},
				{field: "name", headerName: "Hlavní název", flex: 400},
				{field: "publishing_date", headerName: "Datum vydání nebo vzniku", flex: 200, type: 'date'},
			],
			searchParams: this.createSearchParams([]),
		}
		
		this.description = {}

		this.request_v = 0
		this.newestRequest_v = 0

		this.dataSources = {
			"metadata": {
				label: "Metadata",
				url: "metadata",
				urlIndex: "metadata",
				template: [
					{field: "author", headerName: "Hlavní autor", flex: 400},
					{field: "name", headerName: "Hlavní název", flex: 400},
					{field: "publishing_date", headerName: "Datum vydání nebo vzniku", flex: 200, type: 'date'},
				],
				render: (
					<div style={{ display: "grid", rowGap: 5 }}>
						<Typography variant="h5">Autor - Název</Typography>
						<PersonComboBox
							label = { typeDefinitionFile.properties["author"].label }
							variant = "outlined"
							onChange = { e => {(this.description["author"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} }
						/>
						<TextField
							label = { typeDefinitionFile.properties["name"].label }
							variant = "outlined"
							onChange = { e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Klíčová slova</Typography>
						<KeywordComboBox
							label = { typeDefinitionFile.properties["topic_keyword"].label }
							variant = "outlined"
							onChange = { e => {(this.description["topic_keyword"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Rok vydání</Typography>
						<DateField
							label = { typeDefinitionFile.properties["publishing_date"].label }
							variant = "outlined"
							onChange = { e => {(this.description["publishing_date"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Místo vydání</Typography>
						<StaticComboBox
							label = { typeDefinitionFile.properties["publish_country"].label }
							variant = "outlined"
							onChange = { e => {(this.description["publish_country"] = e.target.value); this.search(true)} }
							options = { typeDefinitionFile.properties["publish_country"].options }
							fullWidth
						/>

						<Typography variant="h5">Jazyk</Typography>
						<StaticComboBox
							label = { typeDefinitionFile.properties["language"].label }
							variant = "outlined"
							onChange = { e => {(this.description["language"] = e.target.value); this.search(true)} }
							options = { typeDefinitionFile.properties["language"].options }
							fullWidth
						/>

						<Typography variant="h5">Typ dokumentu</Typography>
						<StaticComboBox
							label = "Typ dokumentu"
							variant = "outlined"
							onChange = { e => {(this.description["documentType"] = e.target.value); this.search(true)} }
							options = { typeDefinitionFile["types"] }
							fullWidth
						/>

						<Typography variant="h5">Standardní číslo</Typography>
						<TextField
							label = { typeDefinitionFile.properties["isbn"].label }
							variant = "outlined"
							onChange = { e => {(this.description["isbn"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<TextField
							label = { typeDefinitionFile.properties["issn"].label }
							variant = "outlined"
							onChange = { e => {(this.description["issn"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>

						<Typography variant="h5">Vlastník záznamu</Typography>
						<TextField
							label = { typeDefinitionFile.properties["submitter"].label }
							variant = "outlined"
							onChange = { e => {(this.description["submitter"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"corporation": {
				label: "Rejstřík korporací",
				url: "corporation",
				urlIndex: "corporationIndex",
				template: [
					{field: "name_main_part", headerName: "Název", flex: 400},
				],
				render: (
					<div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"creation": {
				label: "Rejstřík dílo",
				url: "creation",
				urlIndex: "creationIndex",
				template: [
					{field: "name_main_part", headerName: "Název", flex: 400},
				],
				render: (
					<div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"geographic": {
				label: "Geografický rejstřík",
				url: "geographic",
				urlIndex: "geographicIndex",
				template: [
					{field: "name_main_part", headerName: "Název", flex: 400},
				],
				render: (
					<div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"keyword": {
				label: "Rejstřík klíčových slov",
				url: "keyword",
				urlIndex: "keywordIndex",
				template: [
					{field: "name_main_part", headerName: "Název", flex: 400},
				],
				render: (
					<div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"subject": {
				label: "Rejstřík událostí",
				url: "subject",
				urlIndex: "subjectIndex",
				template: [
					{field: "name_main_part", headerName: "Název", flex: 400},
				],
				render: (
					<div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"family": {
				label: "Rejstřík rodů",
				url: "family",
				urlIndex: "familyIndex",
				template: [
					{field: "name_main_part", headerName: "Název", flex: 400},
				],
				render: (
					<div>
						<TextField
							label = "Název"
							variant = "outlined"
							onChange = { e => {(this.description["name_main_part"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
					</div>
				),
			},
			"person": {
				label: "Rejstřík osob",
				url: "person",
				urlIndex: "personIndex",
				template: [
					{field: "name", headerName: "Jméno", flex: 400},
					{field: "surname", headerName: "Příjmení", flex: 400},
					{field: "born_year", headerName: "Rok narození", flex: 200},
				],
				render: (
					<div>
						<TextField
							label = "Jméno"
							variant = "outlined"
							onChange = { e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<TextField
							label = "Příjmení"
							variant = "outlined"
							onChange = { e => {(this.description["surname"] = `/${e.target.value}/`); this.search(true)} }
							fullWidth
						/>
						<TextField
							label = "Rok narození"
							variant = "outlined"
							onChange = { e => {(this.description["born_year"] = e.target.value === "" ? undefined : e.target.value); this.search(true)} }
							type="number"
							fullWidth
						/>
					</div>
				),
			},
			"metadataAdvanced": {
				label: "Metadata - Rozšířené vyhledávání",
				url: "metadata",
				urlIndex: "metadata",
				template: [
					{field: "author", headerName: "Hlavní autor", flex: 400},
					{field: "name", headerName: "Hlavní název", flex: 400},
					{field: "publishing_date", headerName: "Datum vydání nebo vzniku", flex: 200, type: 'date'},
				],
				render: (
					<div style={{display:"grid", rowGap:"10px"}}>
						<TextField label="Hlavní název" onChange={ e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<PersonComboBox label="Hlavní autor" onChange={ e => {(this.description["author"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} } variant="outlined"/>
						<PersonComboBox label="Další původci" onChange={ e => {(this.description["other_authors_person.id"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} } variant="outlined"/>
						<TextField label="Hlavní název" onChange={ e => {(this.description["name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Další názvy" onChange={ e => {(this.description["other_names"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Jazyk" onChange={ e => {(this.description["language"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<GeographicComboBox label="Země vydání nebo vzniku" onChange={ e => {(this.description["publish.publish_country"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} } variant="outlined"/>
						<GeographicComboBox label="Místo vydání nebo vzniku" onChange={ e => {(this.description["publish.publish_place"] = e.target.value); if(e.target.value !== undefined ) this.search(true)} } variant="outlined"/>
						<DateField label="Datum vydání nebo vzniku" onChange={ e => {(this.description["publishing_date"] = e.target.value); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="ISBN" onChange={ e => {(this.description["isbn"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Edice" onChange={ e => {(this.description["edition"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<CorporationComboBox label="Název akce" onChange={ e => {(this.description["action_name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="ISSN" onChange={ e => {(this.description["issn"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<MetadataComboBox label="Název zdrojového dokumentu" onChange={ e => {(this.description["source_document_name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<CorporationComboBox label="Název korporace" onChange={ e => {(this.description["corporation.corporation_name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Podmínky přístupu" onChange={ e => {(this.description["corporation.access_conditions"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Umístění v instituci" onChange={ e => {(this.description["location.institution"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<MetadataComboBox label="Předcházející název" onChange={ e => {(this.description["previous_name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<MetadataComboBox label="Následující název" onChange={ e => {(this.description["following_name"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Forma" onChange={ e => {(this.description["form"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<CorporationComboBox label="Násobné umístění" onChange={ e => {(this.description["multiple_placement_category"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<PersonComboBox label="Osoba jako předmět obsahu dokumentu" onChange={ e => {(this.description["corporation_content_specification_person"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<CorporationComboBox label="Korporace jako předmět obsahu dokumentu" onChange={ e => {(this.description["corporation_content_specification_corporation"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Chronologické zpřesnění obsahu dokumentu (začátek)" type="number" onChange={ e => {(this.description["chronological_content_specification.begin"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<TextField label="Chronologické zpřesnění obsahu dokumentu (konec)" type="number" onChange={ e => {(this.description["chronological_content_specification.end"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<GeographicComboBox label="Geografické zpřesnění obsahu dokumentu" onChange={ e => {(this.description["geographical_content_specification"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
						<KeywordComboBox label="Klíčová slova" onChange={ e => {(this.description["keywords"] = `/${e.target.value}/`); this.search(true)} } fullWidth variant="outlined"/>
					</div>
				),
			},
		}
	}

	handleChange = (e, type) => {
		if(e.target.value)
			this.props.history.push(`/prak/show/${type}/${e.target.value}`)
	}

	componentDidMount(){
		this.props.enqueueSnackbar(`Vyberte rejstřík, vyplňte požadovaná pole, zmáčkněte vyhledat a poté klikněte na požadovaný záznam`, { variant: "info", autoHideDuration: 6000 })
	}

	search = (fast = false) => {
		const thisRequestVesion = this.request_v++
		const url = `api/${this.dataSources[this.state.indexer].urlIndex}`

		this.setState({loading: true})
		fetch(url,{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({_limit: fast?5:10000, ...this.description})
		})
		.then(response => {
			if(thisRequestVesion < this.newestRequest_v)
				Promise.reject(`Old request version: ${thisRequestVesion}`)
			this.newestRequest_v = thisRequestVesion
			return response.json()
		})
		.then(data => {
			const records = data.map(a => {
				const toReturn = {...a}
				toReturn.born_year = toReturn.author = toReturn.publishing_date = ""
				toReturn.id = a._id
				if(a.born_year) toReturn.born_year = a.born_year.year
				if(a.author && a.author.id) toReturn.author = a.author.id.name + " " + a.author.id.surname
				if(a.publishing_date && a.publishing_date[0] && a.publishing_date[0].date) toReturn.publishing_date = a.publishing_date[0].date
				return toReturn
			})
			console.info("%cFound: ", "background: #222; color: #bada55", records);
			this.setState({
				records,
				loading: false,
				searchParams: this.createSearchParams(records),
			})
		})
		.catch((error) => {
			console.error('Error:', error);
		})
	}

	createSearchParams = (records) => {
		let searchParams = {};

		let properties = ["author", "publishing_date", "publish_country", "language", "documentType", "submitter"];

		for(let property of properties){
			searchParams[property] = [];
			records.forEach((item)=>{
				let itemProperty = item[property]
				if(Array.isArray(itemProperty))
					itemProperty = itemProperty.join(", ")

				if(itemProperty !== undefined && itemProperty !== null && itemProperty !== ""){
					let foundIndex = -1;
					for(let index = 0; index < searchParams[property].length; index++){
						if(searchParams[property][index][0] === itemProperty){
							foundIndex = index;
							break;
						}
					}
					if(foundIndex !== -1)
						searchParams[property][foundIndex][1]++
					else
						searchParams[property].push([itemProperty, 1, true])
				}
			})
		}


		return(searchParams)
	}

	render(){
		return(
			<div className={styles.ShowScene}>
				<Paper className={styles.header}>
					<h1>Vyhledavátko</h1>
				</Paper>
				<Paper className={styles.body}>
					<Select
						value = { this.state.indexer }
						variant = "outlined"
						onChange = { e => {
							const dataSource = this.dataSources[e.target.value]
							this.setState({ indexer: e.target.value, template: dataSource.template, records: []})
							this.description = {}
						} }
					>
						{Object.entries(this.dataSources).map(entry => <MenuItem key={entry[0]} value={entry[0]}>{entry[1].label}</MenuItem>)}
					</Select>

					<Button
						variant="contained"
						color="primary"
						onClick = { ()=>this.search() }
					>
						Vyhledat
					</Button>
					
					{this.dataSources[this.state.indexer].render}

					<div>
						<h3>Nápověda</h3>
						<b>Vyhledání všech záznamů:</b> nechte všechna pole prázdná a klikněte na Vyhledat <br/> <br/>
						<b>Interaktivní režim:</b> už během zadávání se ukáže 5 nejlepších shod<br/> <br/>
						<b>Zobrazení záznamu:</b> klikněte kamkoliv na příslušný záznam v tabulce níže
					</div>
				</Paper>
				
				<Paper className={styles.resultTagSelector}>
					{
						Object.entries(this.state.searchParams).map(([key, value])=> {
							if(value.length === 0)
								return null;
							
							return(
								<div className={styles.resultTag}>
									<h3>{key}</h3>
									{ value
										.sort((itemA, itemB) => itemA[1] < itemB[1] ? 1 : -1)
										.slice(0, 10)
										.map(([key, value, checked])=>(
											<FormControlLabel
												control={<Checkbox checked={checked} />}
												label={(<div>{key} <span className={styles.tagCount}>({value}x)</span></div>)} 
												className={styles.resultTagValue}
												key={key}>
											</FormControlLabel>
										))
									}
								</div>
							)
						})
					}
				</Paper>

				<Paper className={styles.resultsBlock}>
					<DataGrid
						className={styles.cursorPoiter}
						rows={this.state.records}
						columns={this.state.template}
						pageSize={5}
						onRowClick = { e => {
							console.info("%cShow: ", "background: #222; color: #bada55", e.id)
							this.props.history.push(`/prak/show/${this.dataSources[this.state.indexer].url}/${e.id}`)
						} }
					/>
				</Paper>
			</div>
		)
	}
}

export default withSnackbar(withRouter(ShowScene))