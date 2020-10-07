import React from "react"
import {
	NavLink
} from "react-router-dom";

import styles from "./footer.module.scss"

class Footer extends React.Component {
	render(){
		return(
			<div className={styles.footer}>
				<div>
					<h3>Scenes</h3>
					<hr/>
					<ul>
					<li>
						<NavLink to="/prak/edit">EditScene</NavLink>
					</li>
				</ul>

				</div>
				<div>
					<h3>User Scenes</h3>
					<hr/>
					<ul>
						<li>
							<NavLink exact={true} to="/prak/myLibrary">Moje knihovna</NavLink>
						</li>
						<li>
							<NavLink to="/prak/searchHistory">Historie hledání</NavLink>
						</li>
						<li>
							<NavLink to="/prak/help">Nápověda</NavLink>
						</li>
						<li>
							<NavLink to="#">CZ</NavLink>
						</li>
					</ul>
				</div>
				<div>
					<h3>Input</h3>
					<hr/>
					<ul>
						<li> <NavLink to="/prak/input/metadata">metadata</NavLink> </li>
						<li> <NavLink to="/prak/input/corporation">corporation</NavLink> </li>
						<li> <NavLink to="/prak/input/creation">creation</NavLink> </li>
						<li> <NavLink to="/prak/input/geographic">geographic</NavLink> </li>
						<li> <NavLink to="/prak/input/keyword">keyword</NavLink> </li>
						<li> <NavLink to="/prak/input/person">person</NavLink> </li>
						<li> <NavLink to="/prak/input/subject">subject</NavLink> </li>
						<li> <NavLink to="/prak/input/family">family</NavLink> </li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Footer
