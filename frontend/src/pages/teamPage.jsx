import React from "react"

import {
	Paper,
} from '@material-ui/core'
import {
	Person
} from '@material-ui/icons';

import styles from "./teamPage.module.scss"


class TeamPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			isLoaded: false,
			data: {
				peopleMFF: [],
				peopleHAV: [],
			}
		}
	}

	componentDidMount(){
		// todo load data from DB
		// fetch() ...

		// ! temp below
		this.setState({
            isLoaded: true,
            data: {
				peopleMFF: [
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
				],
				peopleHAV: [
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
					{name: "Jméno", surname: "Příjmení", position: "pozice", picture:"", mail: "mail@mail.cz", description: "Cca pět vět jako popis. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec iaculis gravida nulla. Nam sed tellus id magna elementum tincidunt. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."},
				],
			}
		})
	}

	render(){
		return(
			<Paper className={styles.root}>
				<h1>Řešitelský tým</h1>
				
				<h2>Řešitelský tým Matematicko-fyzikální fakulty UK</h2>
				<div className={styles.grid}>
					{this.state.data.peopleMFF.map((value, key) => PersonCard({value, key}))}
				</div>
				<h2>Řešitelský tým Historického ústavu AV ČR</h2>
				<div className={styles.grid}>
					{this.state.data.peopleHAV.map((value, key) => PersonCard({value, key}))}
				</div>
			</Paper>
		)
	}
}

function PersonCard(props){
	return <div key={props.key} className={styles.personCard}>
		<Person className={styles.picture}/>
		<div className={styles.name}>{props.value.name} {props.value.surname}</div>
		<div className={styles.position}>{props.value.position}</div>
		<div className={styles.description}>{props.value.description}</div>
		<div className={styles.mail}>{props.value.mail}</div>
	</div>
}

export default TeamPage