import React from "react"
import { Switch, Route } from "react-router-dom"
import { withSnackbar } from 'notistack'
import { Paper } from '@material-ui/core'

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
			record: null
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
		.then(response => {
			if(response.status === 500)
				throw response
			return response.json()
		})
		.then(data => {
			this.setState({record:data})
		})
		.catch(err=>{
			console.error(err)
			this.props.enqueueSnackbar(`Loading unsuccesful\n`, { variant: "error", autoHideDuration: 6000 })
			this.setState({record:null})
		})
	}

	render(){
		return(
			<div>
				{this.state.record !== null && <Switch>
					<Route path="/prak/edit/metadata/:id">		<Metadata defaults={this.state.record}/>		</Route>

					<Route path="/prak/edit/corporation/:id">	<Corporation defaults={this.state.record}/>		</Route>
					<Route path="/prak/edit/creation/:id">		<Creation defaults={this.state.record}/>		</Route>
					<Route path="/prak/edit/family/:id">		<Family defaults={this.state.record}/>			</Route>
					<Route path="/prak/edit/geographic/:id">	<Geographic defaults={this.state.record}/>		</Route>
					<Route path="/prak/edit/keyword/:id">		<Keyword defaults={this.state.record}/>			</Route>
					<Route path="/prak/edit/person/:id">		<Person defaults={this.state.record}/>			</Route>
					<Route path="/prak/edit/subject/:id">		<Subject defaults={this.state.record}/>			</Route>
					<Route path="/prak/edit">					<Paper>You must choose what to edit</Paper>		</Route>
				</Switch>}
			</div>
		)
	}
}

export default withSnackbar(EditScene)