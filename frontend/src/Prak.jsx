import React from "react"
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom"
import { withCookies, CookiesProvider } from "react-cookie"
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next';
import { SnackbarProvider } from 'notistack'
import WebFont from 'webfontloader';
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"

import PrivateRoute from './components/PrivateRoute'

import NavBar from "./components/navBar"
import Footer from "./components/footer"
import ScrollToTop from "./components/ScrollToTop"
import { PageCategoryList } from "./components/pageCategory"

import Homepage from "./scenes/homepage"
import UploadScene from "./scenes/upload"
import MapsScene from "./scenes/maps"
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

		const theme = createTheme({
			palette: {
				primary: { main: "#000" },
				secondary: { main: "#FFF274" }, 
				type: "light"
			}
		})

		return (
			<div className={styles.prak}>
				<CookiesProvider>
					<SnackbarProvider>
						<MuiThemeProvider theme={theme}>
							<I18nextProvider i18n={i18n}>
								<Router>
									<ScrollToTop/>
									<NavBar/>
									<Switch>
										<Route path="/prak/login"><LoginScene variant="login"/></Route>
										<PrivateRoute path="/prak/admin" privacyLevel="1"><AdminScene/></PrivateRoute>

										<PrivateRoute path="/prak/upload" privacyLevel="2"><UploadScene/></PrivateRoute>
										<PrivateRoute path="/prak/cms" privacyLevel="8"><CmsScene/></PrivateRoute>

										<Route path="/prak/homepage"><Homepage/></Route>
										<PrivateRoute path="/prak/input" privacyLevel="2"><InputScene/></PrivateRoute>
										<PrivateRoute path="/prak/edit" privacyLevel="2"><EditScene/></PrivateRoute>
										<Route path="/prak/show"><ShowScene/></Route>
										<Route path="/prak/search"><SearchScene/></Route>

										<Route path="/prak/contacts"><ContactsPage/></Route>

										<Route path="/prak/maps/:mapID" render={({match}) => <MapsScene mapID={match.params.mapID}/>}></Route>
										<Route path="/prak/page/:pageName" render={({match}) => <LoadPageFromDB pageName={match.params.pageName}/>}></Route>
										<Route path="/prak/pageCategory/:categoryName" render={({match}) => <PageCategoryList pageCategoryName={match.params.categoryName}/>}></Route>

										<Route path="/prak"><Redirect to="/prak/homepage" /></Route>
									</Switch>
									<Footer/>
								</Router>
							</I18nextProvider>
						</MuiThemeProvider>
					</SnackbarProvider>
				</CookiesProvider>
			</div>
		)
	}
}


export default withCookies(Prak)
