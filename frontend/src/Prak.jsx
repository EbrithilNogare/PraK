import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import { withCookies, CookiesProvider } from "react-cookie";

import {
	SnackbarProvider,
} from 'notistack';

import WebFont from 'webfontloader';

import PrivateRoute from './components/PrivateRoute'

import NavBar from "./components/navBar"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"

import InputScene from "./scenes/input"
import LoginScene from "./scenes/login"
import AdminScene from "./scenes/admin"
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
	componentDidMount(){
		const sessionID = this.props.cookies.get("sessionID")
		if(sessionID){
			const url = "/prak/api/auth/"+sessionID

			fetch(url, {
				method: 'GET',
			})
			.then(response => {
				if(!response.ok)
					throw response
				return response.json()
			})
			.then(response => {
				const user = response.firstName || response.secondName ? (response.firstName || "") + " " + (response.secondName || "") : response.email
				const permission = 4 * response.role.read + 2 * response.role.write + 1 * response.role.execute
				console.info("%cLogged as: \n", "background: #222; color: #bada55", user)
				this.props.cookies.set("userID", response._id, { path: "/", expires : new Date(response.sessionExpiration) }); 
				this.props.cookies.set("user", user, { path: "/", expires : new Date(response.sessionExpiration) }); 
				this.props.cookies.set("permission", permission, { path: "/", expires : new Date(response.sessionExpiration) }); 
				this.props.cookies.set("sessionID", sessionID, { path: "/", expires : new Date(response.sessionExpiration) }); 
			})
			.catch((error) => {
				console.error(error)
				this.props.cookies.remove("userID", { path: "/" }); 
				this.props.cookies.remove("user", { path: "/" }); 
				this.props.cookies.remove("permission", { path: "/" }); 
				this.props.cookies.remove("sessionID", { path: "/" }); 
			})
		}
	}

	render(){
		WebFont.load({
			google: {
				families: ["Roboto:400,700"]
			}
		});

		return (
			<div className={styles.prak}>
				<CookiesProvider>
					<SnackbarProvider>
						<Router>
							<ScrollToTop/>
							<NavBar/>
							<Switch>
								<Route path="/prak/login"><LoginScene variant="login"/></Route>
								<PrivateRoute path="/prak/admin" privacyLevel="1"><AdminScene/></PrivateRoute>

								<PrivateRoute path="/prak/input" privacyLevel="2"><InputScene/></PrivateRoute>
								<PrivateRoute path="/prak/edit" privacyLevel="2"><EditScene/></PrivateRoute>
								<PrivateRoute path="/prak/show" privacyLevel="4"><ShowScene/></PrivateRoute>
								<PrivateRoute path="/prak/search" privacyLevel="4"><SearchScene/></PrivateRoute>

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
				</CookiesProvider>
			</div>
		)
	}
}


export default withCookies(Prak)
