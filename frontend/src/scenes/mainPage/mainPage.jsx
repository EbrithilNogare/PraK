import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import { 
	AppBar,
	Box,
	Button,
	Card,
	CardHeader,
	CardContent,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	LinearProgress,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Toolbar,
	Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import "./mainPage.scss"

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
  }));

export default class MainPageScene extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			counter: 0
		};		
	}
	render(){

		return(
			<div className="MainPageScene">
				<AppBar position="static">
					<Grid container>
						
						<Grid item xs={4}>
							<Typography variant="h6">
								Database <br/> source of Krkonose
							</Typography>
						</Grid>

						<Grid item xs>
							<Button color="inherit">MOJE KNIHOVNA</Button>
							<Button color="inherit">HISTORIE HLEDÁNÍ</Button>
							<Button color="inherit">NÁPOVĚDA</Button>
							<Button color="inherit">CZ</Button>
						</Grid>
						
						<Grid item xs={2}>
							Log in {"Jiri Kocian"}
						</Grid>

					</Grid>
				</AppBar>

				<TextField id="filled-basic" label="Search" variant="filled" />

				<Card>
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
				</Card>

				<Card>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Registers
						</Typography>
						<TextField id="outlined-basic" label="Location" variant="outlined" />
						<TextField id="outlined-basic" label="Year" variant="outlined" />					
					</CardContent>		
				</Card>
				
				<Card>
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
				</Card>

			</div>
		)
	}
}
