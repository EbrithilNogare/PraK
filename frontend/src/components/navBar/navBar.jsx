import React from "react"
import {
	NavLink
} from "react-router-dom";

import "./navBar.scss"

class NavBar extends React.Component {
	render(){
		return(
			<nav>
				<ul>
					<li>
						<NavLink exact={true} to="/">MainPageScene</NavLink>
					</li>
					<li>
						<NavLink to="/input">InputScene</NavLink>
					</li>
					<li>
						<NavLink to="/edit">EditScene</NavLink>
					</li>
				</ul>
			</nav>
		)
	}
}

export default NavBar
