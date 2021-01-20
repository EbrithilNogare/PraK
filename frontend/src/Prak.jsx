import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"
import { withCookies, CookiesProvider } from "react-cookie";

import {
	SnackbarProvider,
} from 'notistack';

import WebFont from 'webfontloader';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import PrivateRoute from './components/PrivateRoute'

import NavBar from "./components/navBar"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"

import UploadScene from "./scenes/upload"
import CmsScene from "./scenes/cms"
import InputScene from "./scenes/input"
import LoginScene from "./scenes/login"
import AdminScene from "./scenes/admin"
import EditScene from "./scenes/edit"
import ShowScene from "./scenes/show"
import SearchScene from "./scenes/search"

import LoadPageFromDB from "./components/loadPageFromDB"

import ContactsPage from "./pages/contactsPage"

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
				const permission = 8 * response.role.cms + 4 * response.role.read + 2 * response.role.write + 1 * response.role.execute
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
		})

		const theme = createMuiTheme({
			palette: {
				primary: { main: "#000" },
				secondary: { main: "#FFF274" }, 
				type: "light"
			}
		});

		return (
			<div className={styles.prak}>
				<CookiesProvider>
					<SnackbarProvider>
						<MuiThemeProvider theme={theme}>
							<Router>
								<ScrollToTop/>
								<NavBar/>
								<Switch>
									<Route path="/prak/login"><LoginScene variant="login"/></Route>
									<PrivateRoute path="/prak/admin" privacyLevel="1"><AdminScene/></PrivateRoute>

									<PrivateRoute path="/prak/upload" privacyLevel="2"><UploadScene/></PrivateRoute>
									<PrivateRoute path="/prak/cms" privacyLevel="2"><CmsScene/></PrivateRoute>

									<PrivateRoute path="/prak/input" privacyLevel="2"><InputScene/></PrivateRoute>
									<PrivateRoute path="/prak/edit" privacyLevel="2"><EditScene/></PrivateRoute>
									<PrivateRoute path="/prak/show" privacyLevel="4"><ShowScene/></PrivateRoute>
									<PrivateRoute path="/prak/search" privacyLevel="4"><SearchScene/></PrivateRoute>

									<Route path="/prak/contacts"><ContactsPage/></Route>

									{[
										["/prak/mainPage", "60077c4a2157459fbbfe796c"],
										["/prak/manual", "60077d1b10293a843fe06400"],
										["/prak/about", "60079acd10293a843fe3b387"],
										["/prak/team", "60079ad610293a843fe3b51d"],
										["/prak/ourwork", "60079aee10293a843fe3b732"],
										["/prak/partners", "60079aee10293a843fe3b733"],
									].map((value, key)=>
										<Route key={key} path={value[0]}><LoadPageFromDB pageID={value[1]}/></Route>
									)}

									<Route path="/prak"><Redirect to="/prak/mainPage" /></Route>
								</Switch>
								<Footer/>
							</Router>
						</MuiThemeProvider>
					</SnackbarProvider>
				</CookiesProvider>
			</div>
		)
	}
}


export default withCookies(Prak)
