import React from "react"
import {
	BrowserRouter as Router,
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

class EditScene extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			record: undefined
		}	
	}

	componentDidMount(){
		const splitedHref = window.location.href.split('/')
		if(splitedHref[splitedHref.length-3] !== "edit")
			return
		this.getRecord(splitedHref[splitedHref.length-2], splitedHref[splitedHref.length-1])
	}

	getRecord = (type, id) => {
		if(this.state.record !== null) return

		fetch(`/prak/api/${type}${type==="metadata"?"":"index"}/${id}`)
		.then(response => response.json())
		.then(data => {
			this.setState({record:data})
		})
		.catch(err=>{
			console.log(err)
			this.setState({record:""})
		})
	}

	render(){
		return(
			<div>
				<Router>
					<Switch>
						<Route path="/prak/edit/metadata">		<Metadata defaults={this.state.record}/>		</Route>
						
						<Route path="/prak/edit/corporation">	<Corporation defaults={this.state.record}/>	</Route>
						<Route path="/prak/edit/creation">		<Creation defaults={this.state.record}/>		</Route>
						<Route path="/prak/edit/family">		<Family defaults={this.state.record}/>			</Route>
						<Route path="/prak/edit/geographic">	<Geographic defaults={this.state.record}/>		</Route>
						<Route path="/prak/edit/keyword">		<Keyword defaults={this.state.record}/>		</Route>
						<Route path="/prak/edit/person">		<Person defaults={this.state.record}/>			</Route>
						<Route path="/prak/edit/subject">		<Subject defaults={this.state.record}/>		</Route>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default EditScene