import React from "react"
import {
	NavLink
} from "react-router-dom";

import styles from "./navBar.module.scss"

class NavBar extends React.Component {
	render(){
		return(
			<nav className={styles.navBar}>
				<NavLink exact={true} to="/prak" className={styles.title}>
					Databaze prameny Krkonos
				</NavLink>
				<ul className={styles.navigation}>
					<li>
						<NavLink to="/prak/input">InputScene</NavLink>
					</li>
					<li>
						<NavLink to="/prak/edit">EditScene</NavLink>
					</li>
				</ul>
				<ul className={styles.userNavigation}>
					<li>
						<NavLink exact={true} to="/prak/myLibrary">Moje knihovna</NavLink>
					</li>
					<li>
						<NavLink to="/prak/searchHistory">Historie hledani</NavLink>
					</li>
					<li>
						<NavLink to="/prak/help">Napoveda</NavLink>
					</li>
					<li>
						<NavLink to="#">CZ</NavLink>
					</li>
				</ul>
				<span className={styles.userInfo}>David Napravnik</span>
			</nav>
		)
	}
}

export default NavBar
