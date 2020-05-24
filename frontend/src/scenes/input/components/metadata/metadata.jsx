import React from "react"

import { 
	Select,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Typography,
	CardContent,
} from '@material-ui/core'

import { Pair } from '../../../../components/layout'
import Paper from '../../../../components/paper'

import styles from './metadata.module.scss'
import metadataTypes from './metadataTypes.json'

class Metadata extends React.Component {
	constructor(props){
		super(props)
		
		this.state = { 
			documentType: 0,
		}	

		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	conditionalField(fieldName){
		return metadataTypes.fields[fieldName][this.state.documentType] === 1
	}
	

	render(){
		return(
			<div className={styles.metadata}>
				<div className={styles.leftPanel}>
					<Paper className={styles.mainInput}>
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
					<Paper className={styles.mainInput}>
						{this.conditionalField("Hlavní autor nebo původce") && 
							<TextField label="Hlavní autor nebo původce"/>
						}
						{this.conditionalField("Další původci") && 
							<TextField label="Další původci"/>
						}					
						{this.conditionalField("Hlavní název") && 
							<TextField label="Hlavní název"/>
						}					
						{this.conditionalField("Další názvy") && 
							<TextField label="Další názvy"/>
						}					
						{this.conditionalField("Jazyk") && 
							<TextField label="Jazyk"/>
						}					
						{this.conditionalField("Země vydání nebo vzniku") && 
							<TextField label="Země vydání nebo vzniku"/>
						}					
						{this.conditionalField("Místo vydání nebo vzniku") && 
							<TextField label="Místo vydání nebo vzniku"/>
						}					
						{this.conditionalField("Vydavatel") && 
							<TextField label="Vydavatel"/>
						}					
						{this.conditionalField("Datum vydání nebo vzniku") && 
							<TextField label="Datum vydání nebo vzniku"/>
						}					
						{this.conditionalField("Poznámka k datu vydání") && 
							<TextField label="Poznámka k datu vydání"/>
						}					

						</Paper>
					<Paper className={styles.mainInput}>

					{this.conditionalField("ISBN") && 
						<TextField label="ISBN"/>
					}					
					{this.conditionalField("Pořadí vydání") && 
						<TextField label="Pořadí vydání"/>
					}					
					{this.conditionalField("Edice") && 
						<TextField label="Edice"/>
					}					
					{this.conditionalField("Název akce") && 
						<TextField label="Název akce"/>
					}					
					{this.conditionalField("Obsah svazku") && 
						<TextField label="Obsah svazku"/>
					}					
					{this.conditionalField("Roky vycházení od") && 
						<TextField label="Roky vycházení od"/>
					}					
					{this.conditionalField("Roky vycházení do") && 
						<TextField label="Roky vycházení do"/>
					}					
					{this.conditionalField("Poznámka k rokům vycházení") && 
						<TextField label="Poznámka k rokům vycházení"/>
					}					
					{this.conditionalField("Periodicita") && 
						<TextField label="Periodicita"/>
					}					
					{this.conditionalField("ISSN") && 
						<TextField label="ISSN"/>
					}					
					{this.conditionalField("Název zdrojového dokumentu") && 
						<TextField label="Název zdrojového dokumentu"/>
					}					
					{this.conditionalField("rok") && 
						<TextField label="rok"/>
					}					
					{this.conditionalField("ročník") && 
						<TextField label="ročník"/>
					}					
					{this.conditionalField("číslo") && 
						<TextField label="číslo"/>
					}					
					{this.conditionalField("datum") && 
						<TextField label="datum"/>
					}					

					</Paper>
					<Paper className={styles.mainInput}>

					{this.conditionalField("Název korporace") && 
						<TextField label="Název korporace"/>
					}					
					{this.conditionalField("Podmínky přístupu") && 
						<TextField label="Podmínky přístupu"/>
					}					
					{this.conditionalField("Poznámka k přístupu") && 
						<TextField label="Poznámka k přístupu"/>
					}					
					{this.conditionalField("Umístění v instituci") && 
						<TextField label="Umístění v instituci"/>
					}					
					{this.conditionalField("Umístění ve fondu/Lokace") && 
						<TextField label="Umístění ve fondu/Lokace"/>
					}					
					{this.conditionalField("Poznámka k umístění") && 
						<TextField label="Poznámka k umístění"/>
					}					
					{this.conditionalField("URL digitalizovaného dokumentu") && 
						<TextField label="URL digitalizovaného dokumentu"/>
					}					
					{this.conditionalField("Název externího umístění") && 
						<TextField label="Název externího umístění"/>
					}					
					{this.conditionalField("URL externího umístění") && 
						<TextField label="URL externího umístění"/>
					}					
					{this.conditionalField("URL vedoucí k dokumentu v externím zdroji") && 
						<TextField label="URL vedoucí k dokumentu v externím zdroji"/>
					}					
					{this.conditionalField("Název přílohy") && 
						<TextField label="Název přílohy"/>
					}					
					{this.conditionalField("URL přílohy") && 
						<TextField label="URL přílohy"/>
					}					
					{this.conditionalField("Citace zdroje") && 
						<TextField label="Citace zdroje"/>
					}					
					{this.conditionalField("Předcházející název") && 
						<TextField label="Předcházející název"/>
					}					
					{this.conditionalField("Následující název") && 
						<TextField label="Následující název"/>
					}						

					</Paper>
					<Paper className={styles.mainInput}>

					{this.conditionalField("Forma") && 
						<TextField label="Forma"/>
					}						
					{this.conditionalField("Rozsah") && 
						<TextField label="Rozsah"/>
					}						
					{this.conditionalField("Rozměr") && 
						<TextField label="Rozměr"/>
					}						
					{this.conditionalField("Měřítko") && 
						<TextField label="Měřítko"/>
					}						
					{this.conditionalField("Formát/Jak to vypadá") && 
						<TextField label="Formát/Jak to vypadá"/>
					}						
					{this.conditionalField("Úroveň zpracování") && 
						<TextField label="Úroveň zpracování"/>
					}						
					{this.conditionalField("úroveň popisu") && 
						<TextField label="úroveň popisu"/>
					}						
					{this.conditionalField("Násobné umístění") && 
						<TextField label="Násobné umístění"/>
					}						
					{this.conditionalField("Násobné umístění url") && 
						<TextField label="Násobné umístění url"/>
					}						
					{this.conditionalField("Archivní pomůcky") && 
						<TextField label="Archivní pomůcky"/>
					}						
					{this.conditionalField("Téma") && 
						<TextField label="Téma"/>
					}						
					{this.conditionalField("Osoba, korporace jako předmět obsahu dokumentu") && 
						<TextField label="Osoba, korporace jako předmět obsahu dokumentu"/>
					}						
					{this.conditionalField("Chronologické zpřesnění obsahu dokumentu") && 
						<TextField label="Chronologické zpřesnění obsahu dokumentu"/>
					}						
					{this.conditionalField("Geografické zpřesnění obsahu dokumentu") && 
						<TextField label="Geografické zpřesnění obsahu dokumentu"/>
					}						
					{this.conditionalField("Klíčová slova") && 
						<TextField label="Klíčová slova"/>
					}						
					{this.conditionalField("Abstrakt/Popis") && 
						<TextField label="Abstrakt/Popis"/>
					}						

					</Paper>
					<Paper className={styles.mainInput}>

					{this.conditionalField("Poznámka obecná") && 
						<TextField label="Poznámka obecná"/>
					}						
					{this.conditionalField("Poznámka editora") && 
						<TextField label="Poznámka editora"/>
					}						
					{this.conditionalField("Zadavatel") && 
						<TextField label="Zadavatel"/>
					}						

					</Paper>

				</div>
				<div className={styles.rightPanel}>
					<Pair variant="text" color="primary" aria-label="text primary button group">
						<Button variant="contained" color="primary">Save</Button>
						<Button variant="contained" color="primary">Upload</Button>
					</Pair>
					<Paper>
						<TableContainer className={styles.mainInput}>
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
				</div>

			</div>
		)
	}
}

export default Metadata