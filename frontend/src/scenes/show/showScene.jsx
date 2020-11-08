import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import {
	Paper,
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
			console.log(err)
			this.setState({record:""})
		})
	}

	componentDidMount(){
		const splitedHref = window.location.href.split('/')
		if(splitedHref[splitedHref.length-3] !== "show")
			return
		this.getRecord(splitedHref[splitedHref.length-2], splitedHref[splitedHref.length-1])
	}

	recursiveTreeItem = (nodes) => {
		if(Array.isArray(nodes)){
			return nodes.map( (value, key) => (
				<TreeItem key={key} nodeId={key+"a"} label={value}/>
			))
		}
		else if(typeof nodes === 'object' && nodes !== null){
			return Object.keys(nodes).map((value, key) => {
				if(nodes[value].length === 0)
					return null
				if(typeof nodes[value] === 'object' && nodes[value] !== null)
				return (
					<TreeItem key={key} nodeId={key+""} label={value}>
						{this.recursiveTreeItem(nodes[value])}
					</TreeItem>
				)
				else
					return (<TreeItem key={key} nodeId={key+""} label={value + ": " + nodes[value]}/>)
			})
		} else {
			return (<TreeItem key={nodes} nodeId={nodes+""} label={nodes}/>)
		}
		
		
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
										{this.recursiveTreeItem(this.state.record)}
									</TreeView>
								</Paper>
							</div>
						)}/>
					</Switch>
				</Router>
			</div>
		)
	}
}

export default ShowScene