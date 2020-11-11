import React from 'react'
import {
	Switch,
	Route,
} from "react-router-dom"


import Metadata from '../../components/indices/metadata'
import Corporation from '../../components/indices/corporation'
import Creation from '../../components/indices/creation' 
import Family from '../../components/indices/family'
import Geographic from '../../components/indices/geographic'
import Keyword from '../../components/indices/keyword'
import Person from '../../components/indices/person'
import Subject from '../../components/indices/subject'


import styles from './inputScene.module.scss'

class InputScene extends React.Component {
	render(){
		return(
			<div className={styles.InputScene}>
					<Switch>
						<Route path="/prak/input/metadata">		<Metadata/>		</Route>
						
						<Route path="/prak/input/corporation">	<Corporation/>	</Route>
						<Route path="/prak/input/creation">		<Creation/>		</Route>
						<Route path="/prak/input/family">		<Family/>		</Route>
						<Route path="/prak/input/geographic">	<Geographic/>	</Route>
						<Route path="/prak/input/keyword">		<Keyword/>		</Route>
						<Route path="/prak/input/person">		<Person/>		</Route>
						<Route path="/prak/input/subject">		<Subject/>		</Route>
					</Switch>
			</div>
		)
	}
}

export default InputScene