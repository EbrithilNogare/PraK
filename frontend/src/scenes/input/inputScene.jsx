import React from 'react'

import Paper from '../../components/paper'
import { 
	Select,
	LinearProgress,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
} from '@material-ui/core'

import styles from './inputScene.module.scss'

class InputScene extends React.Component {
	handleChange = (event) => {
		
	};

	render(){
		return(
			<div className={styles.InputScene}>
				<div className={styles.LeftPanel}>
					<Paper className={styles.mainInput}>
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
						<div></div>
						<TextField label="Author"/>
						<div></div>
						<TextField label="Title"/>
						<div></div>
						<TextField label="Alternative title"/>
						<div></div>
						<TextField label="Publisher"/>						
					</Paper>
					<Paper className={styles.technicalInput}>
						<TextField label="Technical notes" multiline rows="5"/>
					</Paper>
					<Paper className={styles.factualInput}>	
						<TextField label="Factual description" multiline rows="5"/>
					</Paper>
				</div>
				
				<div className={styles.RightPanel}>
					<LinearProgress variant="determinate" value={42}/>

					<div>
						<Button variant="contained" color="primary">Save</Button>
						<Button variant="contained" color="primary">Upload</Button>
					</div>

					<Paper className={styles.helpField}>
						Napoveda
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
				</div>
			</div>
		)
	}
}

export default InputScene