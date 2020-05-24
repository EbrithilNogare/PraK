import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"

import WebFont from 'webfontloader';

import "./Prak.scss"
import "./styles/colorScheme.scss"

import NavBar from "./components/navBar"
import Footer from "./components/footer"
import MainPageScene from "./scenes/mainPage"
import SearchScene from "./scenes/search"
import InputScene from "./scenes/input"
import LoginScene from "./scenes/login"
import EditScene from "./scenes/edit"


class Prak extends React.Component {
	render(){
		WebFont.load({
			google: {
				families: ['Roboto:400,700']
			}
		});

		return (
			<div className="prak">
				<Router>
					<NavBar/>
					<Switch>
						<Route path="/prak/login"><LoginScene variant="login"/></Route>						
						<Route path="/prak/registration"><LoginScene variant="registration"/></Route>
						<Route path="/prak/input"><InputScene/></Route>
						<Route path="/prak/edit"><EditScene/></Route>
						<Route path="/prak/search"><SearchScene/></Route>
						<Route path="/prak"><MainPageScene/></Route>
					</Switch>
					<Footer/>
				</Router>
			</div>
		)
	}
}


export default Prak
