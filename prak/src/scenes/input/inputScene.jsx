import React from 'react'

import { 
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Paper,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	LinearProgress,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Card,
	Grid,
	Box
} from '@material-ui/core'

import './inputScene.scss'

class InputScene extends React.Component {
	handleChange = (event) => {
		
	};

	render(){
		return(
			<div className="InputScene">
				<Paper>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						onChange={this.handleChange}
						value={"Book"}
						>
						<option aria-label="None" value="" />
						<option value={"Book"}>Book</option>
						<option value={"Magazine"}>Magazine</option>
					</Select>
					<ExpansionPanel>
						<ExpansionPanelSummary>
							Document
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField label="Author"/>
							<TextField label="Title"/>
							<TextField label="Alternative title"/>
							<TextField label="Publisher"/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel>
						<ExpansionPanelSummary>
							Technical notes
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField
								id="standard-multiline-flexible"
								label="Multiline"
								multiline
								rowsMax="4"
								value={""}
								onChange={this.handleChange}
							/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
					<ExpansionPanel>
						<ExpansionPanelSummary>
							factual description
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<TextField label="Standard" /><br/>
							<TextField label="Standard" /><br/>
							<TextField label="Standard" /><br/>
							<TextField label="Standard" /><br/>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				</Paper>
				
				<Box className="InputSceneRight">
					<LinearProgress variant="determinate" value={42}/>

					<Paper>
						<Button variant="contained" color="primary">Save</Button>
						<Button variant="contained" color="primary">Upload</Button>
					</Paper>

					<Paper>
						click to nodes on the left to open them
					</Paper>

					<TableContainer component={Paper}>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Percents</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Title</TableCell>
									<TableCell>Author</TableCell>
									<TableCell>Inserted</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
							
								<TableRow key={1}>
									<TableCell>89%</TableCell>
									<TableCell>Kniha</TableCell>
									<TableCell>Jaksem vyhral negaro</TableCell>
									<TableCell>Jarg</TableCell>
									<TableCell>Muzeum kladno</TableCell>
								</TableRow>

							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</div>
		)
	}
}

export default InputScene