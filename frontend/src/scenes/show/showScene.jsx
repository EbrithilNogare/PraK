import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import {
	Paper,
} from '@material-ui/core'

import styles from './showScene.module.scss'

class ShowScene extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			record: null
		}	
	}


	getRecord = (type, id) => {
		if(this.state.record !== null) return

		fetch(`/prak/api/${type}${type==="metadata"?"":"index"}/${id}`)
		.then(response => response.json())
		.then(data => {
			this.setState({record:data})
		})
		.catch(err=>{
			console.log(err)
			this.setState({record:""})
		})
	}

	render(){
		return(
			<div className={styles.ShowScene}>
				<Router>
					<Switch>
						<Route path="/prak/show/:type/:id" render={({match}) => (
							<div>
								<Paper className={styles.header}>
									<h1>Záznam z rejstříku {match.params.type}</h1>
								</Paper>
								<Paper className={styles.body}>
									<pre>
										{this.getRecord(match.params.type, match.params.id)}
										{JSON.stringify(this.state.record, null, 4)
											.replace(/\"/g, "")
											.replace(/\[\]/g, "[ ]")
										}
									</pre>
								</Paper>
							</div>
						)}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default ShowScene