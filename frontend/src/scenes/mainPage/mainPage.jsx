import React from "react"

import Paper from '../../components/paper'
import { 
	Card,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@material-ui/core'

import styles from './mainPage.module.scss'

export default class MainPageScene extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			counter: 0
		};		
	}
	render(){ return(
		<div className={styles.MainPage}>
			<div className={styles.LeftPanel}>
				<Paper>
					<TextField id="filled-basic" label="Search" variant="filled"/>
				</Paper>
				<Paper>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Documents
						</Typography>
						<TextField id="outlined-basic" label="Type of document" variant="outlined" />
						<TextField id="outlined-basic" label="Title" variant="outlined" />
						<TextField id="outlined-basic" label="Location" variant="outlined" />
						<TextField id="outlined-basic" label="Author" variant="outlined" />
						<TextField id="outlined-basic" label="Year" variant="outlined" />			
					</CardContent>
				</Paper>
				<Paper>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Registers
						</Typography>
						<TextField id="outlined-basic" label="Location" variant="outlined" />
						<TextField id="outlined-basic" label="Year" variant="outlined" />					
					</CardContent>
				</Paper>
			</div>
			<div className={styles.RightPanel}>
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
										<TableCell>{"Kniha"}</TableCell>
										<TableCell>{"von. Sojka praskacka"}</TableCell>
										<TableCell>{"Trantumberk"}</TableCell>
										<TableCell>{"Vrchlabi"}</TableCell>
										<TableCell>{1927}</TableCell>
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
