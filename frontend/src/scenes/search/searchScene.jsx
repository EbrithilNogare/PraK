import React from "react"

import { Pair } from '../../components/layout'
import {
	Paper,
	Button,
	Chip,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Slider,
} from '@material-ui/core'

import styles from './searchScene.module.scss'

export default class SearchScene extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			counter: 0
		};		
	}
	render(){ return(
		<div className={styles.searchScene}>
			<div className={styles.LeftPanel}>
				<Paper className={styles.searchField}>
					<TextField 
						variant="outlined"
						placeholder="Search"
						inputProps={{style: { textAlign: 'center' }}}
					>
						<Button className={styles.searchButton} variant="contained">find</Button>
					</TextField>
					
				</Paper>
				<Paper>
					<CardContent className={styles.gridFieldset}>
						<TextField label="Type of document"/>
						<TextField label="Title"/>
						<TextField label="Author"/>
						<TextField label="Location"/>	
					</CardContent>
				</Paper>
				<Paper>
					<CardContent>
						<Typography id="non-linear-slider" gutterBottom>
							Year range
						</Typography>
						<Slider
							valueLabelDisplay="auto"
							aria-labelledby="range-slider"
							getAriaValueText={(value)=>{return value}}
							defaultValue={[2000, 2015]}
							min={1980}
							max={2020}
							step={1}
						/>
					</CardContent>
				</Paper>

				<Pair>

				<Paper>
					<CardContent className={styles.gridChips}>		
						<Typography>Keywords</Typography>
						<TextField label="Add keyword"/>
						<div>
							<Chip
								label="childs"
								variant="outlined"
								onDelete={()=>{}}
							/>
							<Chip
								label="swords"
								variant="outlined"
								onDelete={()=>{}}
							/>
							<Chip
								label="ocean"
								variant="outlined"
								onDelete={()=>{}}
							/>
						</div>			
					</CardContent>
				</Paper>
						
				<Paper>
					<CardContent className={styles.gridChips}>	
						<Typography>Genre</Typography>
						<TextField label="Add genre"/>	
						<div>
							<Chip
								label="horror"
								variant="outlined"
								clickable
								onDelete={()=>{}}
							/>
							<Chip
								label="sci-fi"
								variant="outlined"
								clickable
								onDelete={()=>{}}
							/>
						</div>		
					</CardContent>
				</Paper>
				</Pair>
			</div>
			<div className={styles.RightPanel}>
				<Paper>
					<iframe 
						src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d152532.46197745937!2d15.54773112466256!3d50.737403035966864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2scz!4v1588113305104!5m2!1sen!2scz"
						frameborder="0"
						style={{border: "0", width:"100%", "min-height":"300px"}}
						allowfullscreen
						title="googleMap"
					/>
				</Paper>

				<Paper>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Results
						</Typography>
						<TableContainer>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Type</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Author</TableCell>
										<TableCell>Location</TableCell>
										<TableCell>Year</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>								
									<TableRow key={0}>
										<TableCell>{}</TableCell>
										<TableCell>{}</TableCell>
										<TableCell>{}</TableCell>
										<TableCell>{}</TableCell>
										<TableCell>{}</TableCell>
									</TableRow>								
								</TableBody>
							</Table>
						</TableContainer>
					</CardContent>
				</Paper>
			</div>		
		</div>
	)}
}
