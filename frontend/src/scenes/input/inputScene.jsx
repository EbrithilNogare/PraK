import React from 'react'

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
	InputLabel,
	MenuItem,
	FormControl,
	Typography,
	CardContent,
	ButtonGroup,
} from '@material-ui/core'

import { Pair } from '../../components/layout'
import Paper from '../../components/paper'

import styles from './inputScene.module.scss'

class InputScene extends React.Component {
	handleChange = (event) => {
		
	};

	render(){
		return(
			<div className={styles.InputScene}>
				<div className={styles.LeftPanel}>
					<Paper className={styles.mainInput}>
						<FormControl>
							<InputLabel id="selectTypeLabel">Type</InputLabel>
							<Select labelId="selectTypeLabel">
								<MenuItem value={"Book"}>Book</MenuItem>
								<MenuItem value={"Magazine"}>Magazine</MenuItem>
							</Select>
						</FormControl>
						<div/>
						<TextField label="Author"/>
						<div/>
						<TextField label="Title"/>
						<div/>
						<TextField label="Alternative title"/>
						<div/>
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
					
					<Pair variant="text" color="primary" aria-label="text primary button group">
						<Button variant="contained" color="primary">Save</Button>
						<Button variant="contained" color="primary">Upload</Button>
					</Pair>


					<Paper className={styles.helpField}>
						<Typography gutterBottom variant="h5">
							Helper
						</Typography>
					</Paper>

					<TableContainer component={Paper}>
						<CardContent>
							<Typography gutterBottom variant="h5">
								Duplicates match
							</Typography>
						</CardContent>						
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
							
								<TableRow>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
									<TableCell>{}</TableCell>
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