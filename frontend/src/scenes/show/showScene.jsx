import React from 'react'
import { withRouter } from "react-router-dom"
import { withSnackbar } from 'notistack'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import {
	Paper,
	Grid,
	Button,
} from '@material-ui/core'
import {
	TreeView,
	TreeItem,
} from '@material-ui/lab'
import {
	ExpandMore,
	ChevronRight,
} from '@material-ui/icons';
import styles from './showScene.module.scss'

class ShowScene extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			record: null
		}	
		this.uniqueId = 0
	}


	getRecord = (type, id) => {
		if(this.state.record !== null) return

		fetch(`/prak/api/${type}${type==="metadata"?"":"index"}/${id}`)
		.then(response => response.json())
		.then(data => {
			this.setState({record:data})
		})
		.catch(err=>{
			console.error(err)
			this.setState({record:""})
		})
	}

	componentDidMount(){
		const splitedHref = window.location.href.split('/')
		if(splitedHref[splitedHref.length-3] !== "show")
			return
		this.getRecord(splitedHref[splitedHref.length-2], splitedHref[splitedHref.length-1])
	}

	recursiveTreeItem = (nodes, uniqueKey) => {
		if(Array.isArray(nodes)){
			return nodes.map( (value, key) => {
				if(typeof value === 'object' && value !== null)
				return (
					<TreeItem key={key} nodeId={uniqueKey+"-"+key} label={key}>
						{this.recursiveTreeItem(value, uniqueKey+"-"+key)}
					</TreeItem>
				)
				else return (
				<TreeItem key={key} nodeId={uniqueKey+"-"+key} label={value}/>
			)})
		}
		else if(typeof nodes === 'object' && nodes !== null){
			return Object.keys(nodes).map((value, key) => {
				if(nodes[value].length === 0)
					return null
				if(typeof nodes[value] === 'object' && nodes[value] !== null)
				return (
					<TreeItem key={key} nodeId={uniqueKey+"-"+key} label={value}>
						{this.recursiveTreeItem(nodes[value], uniqueKey+"-"+key)}
					</TreeItem>
				)
				else
					return (<TreeItem key={key} nodeId={uniqueKey+"-"+key} label={value + ": " + nodes[value]}/>)
			})
		} else {
			return (<TreeItem key={nodes} nodeId={uniqueKey+"-"+0} label={nodes}/>)
		}		
	}

	handleEdit = (e, type, id) => {
		this.props.history.push(`/prak/edit/${type}/${id}`)
	}

	handleRemove = (e, type, id) => {
		console.info(`%cRemove record "${id}" from ${type} collection`, "background: #222; color: #bada55")

		fetch(`/prak/api/${type}${type==="metadata"?"":"index"}/${id}`,{
			method: "DELETE",
		})
		.then(response => {
			if(response.status === 500)
				throw response
			return response.json()
		})
		.then(response => {
			console.info("%cResponse:\n", "background: #222; color: #bada55", response)
			this.props.enqueueSnackbar(`Removed succesfully\n`, { variant: "success", autoHideDuration: 6000 })
			this.props.history.push(`/prak/show/${type}/${id}`)
		})
		.catch((error) => {
			console.error('Removing unsuccesful:', error)

			if(error.status && error.status === 500) error.json().then(errorMessage =>{
				console.error("errorMessage from server:", errorMessage)
				if(errorMessage.details.message)
					this.props.enqueueSnackbar(errorMessage.details.message, { variant: "error", autoHideDuration: 6000 })
				if(errorMessage.details.code && (errorMessage.details.code === 11000 || errorMessage.details.code === 11001))
					this.props.enqueueSnackbar(`duplicite error at: ${JSON.stringify(errorMessage.details.keyValue)}`, { variant: "error", autoHideDuration: 6000 })
			})
			else
				this.props.enqueueSnackbar(`Removing unsuccesful: ${error}`, { variant: "error", autoHideDuration: 6000 })
		})
	}

	render(){
		return(
			<div className={styles.ShowScene}>
				<Router>
					<Switch>
						<Route path="/prak/show/:type/:id" render={({match}) => (
							<div>
								<Paper className={styles.header}>
									<h1>Záznam z rejstříku {match.params.type}</h1>
								</Paper>
								<Paper className={styles.body}>
									<TreeView
										defaultCollapseIcon={<ExpandMore />}
										defaultExpandIcon={<ChevronRight />}
									>
										{this.recursiveTreeItem(this.state.record, 0)}
									</TreeView>
								</Paper>
								<Grid container spacing={10} justify="flex-end">
								<Grid item>
								</Grid>
								<Grid item>
									<Button
										variant="contained" 
										color="primary"
										onClick={ e => this.handleRemove(e, match.params.type, match.params.id) }
									>Smazat záznam</Button>
								</Grid>
								<Grid item>
									<Button
										variant="contained" 
										color="primary"
										onClick={ e => this.handleEdit(e, match.params.type, match.params.id) }
									>Editovat záznam</Button>
								</Grid>
								</Grid>
							</div>
						)}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default withSnackbar(withRouter(ShowScene))