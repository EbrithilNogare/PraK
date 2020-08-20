import React from "react"

import { 
	TextField,
	Card,
	CardContent,
	Typography,
} from '@material-ui/core'
import MaterialTable from 'material-table'

import styles from './corporation.module.scss'

class Corporation extends React.Component {
	constructor(props){
		super(props)
		
		this.state = { 
			schema:  {
				acronym: [],
				historical_name: [],
				other_name_form: [],
				following_name: [],
				side_part: [],
				characteristic: [],
				constitutive_standards: [],
				scope_standards: [],
				parent_corporation: [],
				part_of: [],
				precedent_corporation: [],
				related_country: [],
				owner_change: [],
				place_change: [],
				organisation_inclusion: [],
				change_parent_organisation: [],
				categorization: [],
				category: [],
				domain_scope: [],
				geographical_scope: [],
				logo: [],
				mark: [],
				flag: [],
				notes: [],
				record_sources: [],
				other_source: [],
				awards: [],
			}
		}	
	}

	handleChange(event){
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render(){
		return(
			<div className={styles.corporation}>
				<MaterialTable
					title="Jiny zdroj"
					columns={[
						{title:"nazev", field:"name"},
						{title:"id", field:"id"},
						{title:"Identifikátor", field:"identificator"},
					]}
					data={this.state.schema.other_source}
					editable = {{
						onRowAdd: (newData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve()
									this.setState((prevState) => {
										const newState = prevState
										newState.schema.other_source.push(newData)
										return newState
									})
								}, 600)
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve) => {
								setTimeout(() => {
									resolve()
									if (oldData) {
										this.setState((prevState) => {
											const newState = prevState
											newState.schema.other_source[newState.schema.other_source.indexOf(oldData)] = newData
											return newState
										})
									}
								}, 600)
							}),
							onRowDelete: (oldData) =>
								new Promise((resolve) => {
									setTimeout(() => {
									resolve()
									this.setState((prevState) => {
										const newState = prevState
										newState.schema.other_source.splice(newState.schema.other_source.indexOf(oldData),1)
										return newState
									})
									}, 600)
								}),
					}}
				/>		
				
				<Card>
					<CardContent>
						<TextField label="Název"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Variantní označení
						</Typography>
						<TextField label="akronym/zkratka"/><br/>
						<TextField label="historická/dřívější forma jména"/><br/>
						<TextField label="jiné označení"/><br/>
						<TextField label="následující forma jména"/><br/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Části označení
						</Typography>
						<TextField label="hlavní část"/>
						<TextField label="vedlejší část"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Doplňky označení
						</Typography>
						<TextField label="obecný doplněk"/>
						<TextField label="geografický doplněk"/>
						<TextField label="chronologický doplněk"/>
						<TextField label="stručná charakteristika"/>
						<TextField label="historie"/>
						<TextField label="funkce"/>
						<TextField label="normy konstitutivní"/>
						<TextField label="normy - působnost původce"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<TextField label="Souřadnice"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Vztahy
						</Typography>
						<TextField label="nadřízená korporace"/>
						<TextField label="je část"/>
						<TextField label="zahrnuta v korporaci"/>
						<TextField label="související země"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Vznik/ počátek existence
						</Typography>
						<TextField label="zřízení, založení zakladatel"/>
						<TextField label="ustanovující dokument"/>
						<TextField label="geografický objekt v roli předchůdce"/>
						<TextField label="zapsání dílo"/>
						<TextField label="událost"/>
						<TextField label="odštěpení evidence existence - osoba"/>
						<TextField label="ustanovující dokument"/>
						<TextField label="geografický objekt v roli předchůdce"/>
						<TextField label="chronologické zpřesnění"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Konec existence
						</Typography>
						<TextField label="zrušení, likvidace, rozpuštění osoba/bytost která se podílela na zániku"/>
						<TextField label="související dokument"/>
						<TextField label="geografický objekt jako následník"/>
						<TextField label="výmaz z evidence dilo/vytvor"/>
						<TextField label="udalost"/>
						<TextField label="chronologické zpřesnění"/>
					</CardContent>
				</Card>
				
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Konec existence
						</Typography>
						<TextField label="zrušení, likvidace, rozpuštění osoba/bytost která se podílela na zániku"/>
						<TextField label="související dokument"/>
						<TextField label="geografický objekt jako následník"/>
						<TextField label="výmaz z evidence dilo/vytvor"/>
						<TextField label="udalost"/>
						<TextField label="chronologické zpřesnění"/>
					</CardContent>
				</Card>
				
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Událost
						</Typography>
						<TextField label="změna majitele, držitele"/>
						<TextField label="přesun na jiné místo"/>
						<TextField label="organizační začlenění"/>
						<TextField label="změna nadřazené organizace"/>
						<TextField label="ocenění"/>
						<TextField label="ocenění"/>
						<TextField label="udělení ocenění"/>
						<TextField label="udělovatel"/>
					</CardContent>
				</Card>				
				
				<Card>
					<CardContent>
						<Typography variant="h4">
							Zařazení
						</Typography>
						<TextField label="zařazení"/>
						<TextField label="obor působnosti"/>
						<TextField label="geografická působnosti"/>
						<TextField label="charakteristika"/>
						<TextField label="logo"/>
						<TextField label="značka"/>
						<TextField label="vlajka"/>
					</CardContent>
				</Card>
				
				<Card>
					<CardContent>
						<TextField label="Poznámky"/>
					</CardContent>
				</Card>

				<Card>
					<CardContent>
						<TextField label="Zdroje o heslu"/>
					</CardContent>
				</Card>					
			</div>
		)
	}
}

export default Corporation