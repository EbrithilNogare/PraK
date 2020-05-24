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
							<NavLink to="/prak/searchHistory">Historie hledani</NavLink>
						</li>
						<li>
							<NavLink to="/prak/help">Napoveda</NavLink>
						</li>
						<li>
							<NavLink to="#">CZ</NavLink>
						</li>
					</ul>
				</div>
				<div>
					<h3>Metadata</h3>
					<hr/>
					<ul>
						<li>
							<NavLink to="/prak/search/metadata">Search</NavLink>
						</li>
						<li>
							<NavLink to="/prak/input/metadata">Insert</NavLink>
						</li>
						<li>
							<NavLink to="/prak/show/metadata">Show</NavLink>
						</li>
						<li>
							<NavLink to="/prak/edit/metadata">Edit</NavLink>
						</li>
					</ul>
				</div>
				<div>
				<h3>Person</h3>
					<hr/>
					<ul>
						<li>
							<NavLink to="/prak/search/person">Search</NavLink>
						</li>
						<li>
							<NavLink to="/prak/input/person">Insert</NavLink>
						</li>
						<li>
							<NavLink to="/prak/show/person">Show</NavLink>
						</li>
						<li>
							<NavLink to="/prak/edit/person">Edit</NavLink>
						</li>
					</ul>
					<h3>Corporation</h3>
					<hr/>
					<ul>
						<li>
							<NavLink to="/prak/search/corporation">Search</NavLink>
						</li>
						<li>
							<NavLink to="/prak/input/corporation">Insert</NavLink>
						</li>
						<li>
							<NavLink to="/prak/show/corporation">Show</NavLink>
						</li>
						<li>
							<NavLink to="/prak/edit/corporation">Edit</NavLink>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Footer
