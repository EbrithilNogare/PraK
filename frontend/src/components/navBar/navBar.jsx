import React from "react"
import {
	NavLink
} from "react-router-dom";
import {
	Person
} from '@material-ui/icons';

import styles from "./navBar.module.scss"

class NavBar extends React.Component {
	render(){
		return(
			<nav className={styles.navBar}>
				<NavLink exact={true} to="/prak" className={styles.logo}>
					<img src="/prak/images/logo_prameny_krkonos.svg" alt="logo"/>
				</NavLink>
				<div className={styles.social}>
					<NavLink to="/prak/search">
						<img src="/prak/images/lupa.svg" alt="lupa"/>
					</NavLink>
					<a href="https://www.facebook.com/Prameny-Krkono%C5%A1-116257540504030/">
						<img src="/prak/images/facebook.svg" alt="facebook"/>
					</a>
					<a href="https://www.instagram.com/pramenykrkonos/">
						<img src="/prak/images/instagram.svg" alt="instagram"/>
					</a>
					<NavLink to="/prak/page/cs/homepage">
						CZ
					</NavLink>
					<NavLink to="/prak/page/d/homepage">
						D
					</NavLink>
					<NavLink to="/prak/page/en/homepage">
						EN
					</NavLink>
					<NavLink to="/prak/login"><Person/></NavLink>
				</div>
				<div className={styles.menu}>
					<NavLink to="/prak/page/cs/about">O projektu</NavLink>
					<NavLink to="/prak/page/cs/team">Řešitelský tým</NavLink>
					<div className={styles.dropdown}>
						<NavLink to="/prak/page/cs/ourwork">Výstupy</NavLink>
						<div className={styles.dropdownContent}>
							<NavLink to="/prak/page/cs/coming_soon">Vědecká konference</NavLink>
							<NavLink to="/prak/page/cs/coming_soon">Výstava Krkonoše v roce 1938</NavLink>
							<NavLink to="/prak/page/cs/coming_soon">Kolektivní monografie</NavLink>
							<NavLink to="/prak/page/cs/coming_soon">Odborné články</NavLink>
							<NavLink to="/prak/page/cs/coming_soon">Mapy s odborným obsahem</NavLink>
							<NavLink to="/prak/page/cs/coming_soon">Veřejná databáze Prameny Krkonoš</NavLink>
							<NavLink to="/prak/page/cs/coming_soon">Software</NavLink>
						</div>
					</div>
					<NavLink to="/prak/page/cs/partners">Partneři</NavLink>
					<NavLink to="/prak/contacts">Kontakty</NavLink>
					<NavLink to="/prak/page/cs/coming_soon">Aktuality</NavLink>
					<NavLink to="/prak/page/cs/coming_soon">Místopis Krkonoš</NavLink>
					<NavLink to="/prak/page/cs/coming_soon">Střípky z Krkonoš</NavLink>
				</div>
			</nav>
		)
	}
}

export default NavBar
