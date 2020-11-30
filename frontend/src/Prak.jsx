import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"

import {
	SnackbarProvider,
} from 'notistack';

import WebFont from 'webfontloader';


import NavBar from "./components/navBar"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"

import InputScene from "./scenes/input"
import LoginScene from "./scenes/login"
import EditScene from "./scenes/edit"
import ShowScene from "./scenes/show"
import SearchScene from "./scenes/search"

import MainPageScene from "./pages/mainPage"
import AboutPage from "./pages/aboutPage"
import TeamPage from "./pages/teamPage"
import OurWorkPage from "./pages/ourWorkPage"
import PartnersPage from "./pages/partnersPage"
import ContactsPage from "./pages/contactsPage"
import ManualPage from "./pages/manualPage"

import "./styles/colorScheme.scss"
import styles from "./Prak.module.scss"

class Prak extends React.Component {
	render(){
		WebFont.load({
			google: {
				families: ["Roboto:400,700"]
			}
		});

		return (
			<div className={styles.prak}>
				<SnackbarProvider>
					<Router>
						<ScrollToTop/>
						<NavBar/>
						<Switch>
							<Route path="/prak/login"><LoginScene variant="login"/></Route>
							<Route path="/prak/registration"><LoginScene variant="registration"/></Route>

							<Route path="/prak/input"><InputScene/></Route>
							<Route path="/prak/edit"><EditScene/></Route>
							<Route path="/prak/show"><ShowScene/></Route>
							<Route path="/prak/search"><SearchScene/></Route>

							<Route path="/prak/about"><AboutPage/></Route>
							<Route path="/prak/team"><TeamPage/></Route>
							<Route path="/prak/ourwork"><OurWorkPage/></Route>
							<Route path="/prak/partners"><PartnersPage/></Route>
							<Route path="/prak/contacts"><ContactsPage/></Route>

							<Route path="/prak/manual"><ManualPage/></Route>

							<Route path="/prak"><MainPageScene/></Route>
						</Switch>
						<Footer/>
					</Router>
				</SnackbarProvider>
			</div>
		)
	}
}


export default Prak
