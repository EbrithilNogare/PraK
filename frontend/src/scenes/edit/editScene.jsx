import React from "react"

import { 	
	Button,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core'

import Paper from '../../components/paper'

import styles from './editScene.module.scss'

class EditScene extends React.Component {
	render(){
		return(
			<div className={styles.editScene}>
				<Paper>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Sell</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Aut</TableCell>
									<TableCell>Editor</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								
								<TableRow>							
									<TableCell>{<Checkbox></Checkbox>}</TableCell>	
									<TableCell>{"book"}</TableCell>	
									<TableCell>{"Krkk..."}</TableCell>	
									<TableCell>{"muzemum vrc"}</TableCell>	
									<TableCell>{"kmail broz"}</TableCell>
								</TableRow>
								
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				<Paper>
					<TableContainer>
						<Table aria-label="simple table">
							<TableBody>
								
							<TableRow>							
									<TableCell>{"Type"}</TableCell>	
									<TableCell>{"BOOK"}</TableCell>	
								</TableRow>
								
								<TableRow>							
									<TableCell>{"Aut"}</TableCell>	
									<TableCell>{"Muzeum"}</TableCell>	
								</TableRow>
								
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				
				<Paper>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Values</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								
								<TableRow>							
									<TableCell>{"+"}</TableCell>	
								</TableRow>

								<TableRow>	
									<TableCell>{"Varnsdorf"}</TableCell>	
								</TableRow>
															
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				<Paper>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Sim</TableCell>
									<TableCell>Type</TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Aut</TableCell>
									<TableCell>Editor</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								
								<TableRow>							
									<TableCell>{"89%"}</TableCell>	
									<TableCell>{"book"}</TableCell>	
									<TableCell>{"Krkk..."}</TableCell>	
									<TableCell>{"muzemum vrc"}</TableCell>	
									<TableCell>{"kmail broz"}</TableCell>
								</TableRow>
								
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				<Paper>
					<TableContainer>
						<Table aria-label="simple table">
							<TableBody>
								
							<TableRow>							
									<TableCell>{"Metadata"}</TableCell>	
									<TableCell>{"filters"}</TableCell>	
								</TableRow>
								
								<TableRow>							
									<TableCell>{"Aut"}</TableCell>	
									<TableCell>{"trantms"}</TableCell>	
								</TableRow>
								
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>

				<Button variant="contained" color="primary">Send</Button>	

			</div>
		)
	}
}

export default EditScene