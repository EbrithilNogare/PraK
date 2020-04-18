import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"

import 'typeface-roboto';

import "./Prak.scss"

import NavBar from "./components/navBar/navBar"
import MainPageScene from "./scenes/mainPage"
import InputScene from "./scenes/input"
import EditScene from "./scenes/edit"


class Prak extends React.Component {
	render(){
		return (
			<div className="prak">
				<Router>
					<NavBar/>
					<Switch>
						<Route path="/prak/input">
							<InputScene/>
						</Route>
						<Route path="/prak/edit">
							<EditScene/>
						</Route>
						<Route path="/prak">
							<MainPageScene/>
						</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}


export default Prak
