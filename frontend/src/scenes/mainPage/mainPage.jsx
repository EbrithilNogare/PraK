import React from "react"

import Paper from '../../components/paper'
import { Pair } from '../../components/layout'
import {
	Button,
	Chip,
	CardContent,
	FormControl,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Slider,
	InputLabel,
	Input,
	Divider,
	InputAdornment,
	Box,
} from '@material-ui/core'
import { LoremIpsum } from "lorem-ipsum"
  
  

import styles from './mainPage.module.scss'

export default class MainPageScene extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		const lorem = new LoremIpsum({
			sentencesPerParagraph: {
			  max: 8,
			  min: 4
			},
			wordsPerSentence: {
			  max: 16,
			  min: 4
			}
		})
		
		return(
		<div className={styles.mainPage}>
			<div className={styles.pageHeader}>Prameny Krkonoš</div>
			<div className={styles.parallax}/>
			<div className={styles.content}>

				<Paper>
					<div className={styles.leftInfo}>
						<h1>O projektu PraK</h1>		
						<img src="images/logo.png" alt="logo"/>							
						{lorem.generateParagraphs(3)}
					</div>
					
					<div className={styles.rightInfo}>
						<h1>Jak PraK používat</h1>	
						{lorem.generateParagraphs(3)}
						<img src="images/devices.png" alt="devices"/>	
					</div>
					
					<div className={styles.leftInfo}>
						<h1>Pro koho je Prak určen</h1>	
						<img src="images/students.png" alt="students"/>			
						{lorem.generateParagraphs(3)}
					</div>
				</Paper>

			</div>
		</div>
	)}
}
