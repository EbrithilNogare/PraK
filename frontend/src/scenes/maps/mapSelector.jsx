import React from "react"
import {
	Button,
	TextField
} from '@material-ui/core'

import mapsData from "./maps.json"

import styles from './mapsScene.module.scss'

class MapSelector extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			searchField: ""
		}
	}

	handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

	render(){
		return(
			<div className={styles.root}>
				<div className={styles.title}>
					<h1>Zobrazení map</h1>
				</div>
				<div>
				<TextField
					label="Map name"
					name="searchField"
					value={this.state.searchField}
					style={{width:"240px"}}
					onChange={this.handleChange}
				/>
				</div>
				<br/>
				<div className={styles.selectMapGrid}>
					{
						mapsData
							.filter(item=>{return item.name.match(this.state.searchField)})
							.sort((a, b)=> (a.name > b.name) ? 1 : (a.name === b.name) ? 0 : -1 )
							.map(map=>(
								<a key={map.id} href={"maps/"+map.url}>
									<Button variant="contained" color="primary">
										{map.name}
									</Button>
								</a>
					))}
					
				</div>
			</div>	
		)
	}
}

export default MapSelector