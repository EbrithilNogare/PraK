import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"


import Metadata from './components/metadata'
import Person from './components/person'
import Corporation from './components/corporation'
import Geographic from './components/geographic'
import Keyword from './components/keyword'


import styles from './inputScene.module.scss'

class InputScene extends React.Component {
	handleChange = (event) => {
		
	};

	render(){
		return(
			<div className={styles.InputScene}>
				<Router>
					<Switch>
						<Route path="/prak/input/metadata"><Metadata/></Route>
						
						<Route path="/prak/input/person"><Person/></Route>
						<Route path="/prak/input/corporation"><Corporation/></Route>
						<Route path="/prak/input/geographic"><Geographic/></Route>
						<Route path="/prak/input/keyword"><Keyword/></Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default InputScene