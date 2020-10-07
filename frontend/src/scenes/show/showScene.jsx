import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"

import styles from './showScene.module.scss'

class ShowScene extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			record: "null"
		}	
	}


	getRecord = (type, id) => {
		if(this.state.record !== "null") return

		fetch(`/prak/api/${type}${type==="metadata"?"":"index"}/${id}`)
		.then(response => response.json())
		.then(data => {
			this.setState({record:JSON.stringify(data, null, 2)})
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
								{this.getRecord(match.params.type, match.params.id)}
								{match.params.type}
								<br/>
								{match.params.id}
								<br/>
								<pre>
									{this.state.record}
								</pre>
							</div>
						)}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default ShowScene