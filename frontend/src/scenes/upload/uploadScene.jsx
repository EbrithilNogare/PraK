import React from "react"
import UploadFile from "../../components/UploadFile"

import styles from './uploadScene.module.scss'

class UploadScene extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			path: "",
			currentFiles: [],
		}
	}

	componentDidMount(){
		this.loadCurrentFiles()
	}

	loadCurrentFiles = () => {
		const url = "/prak/api/uploads"
		const body = { category: "news", language: "cz" }

		fetch(url, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			this.setState({ currentFiles: response })
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	handleChange = (e) => this.setState({ path: e.target.value })

	trimName = (name) => {
		return {
			name: name.substring(name.indexOf("-") + 1),
			fullname: name,
			type: name.substring(name.lastIndexOf(".") + 1),
		}
	}

	baseName = "/prak/uploads/" 
	pictureTypes = ["jpg", "png", "jpeg", "bmp", "tiff", "webp"]

	render(){
		return(
			<div className={styles.root}>
				<div className={styles.title}>
					<h1>Nahrávnání souborů</h1>
				</div>

				<div>
					<div>
						<span>Nové soubory nahrávejte zde:</span>
						<UploadFile onChange={this.handleChange}/>
					</div>
					{this.state.path !== "" && <a href={this.state.path}>Show saved file</a>}
					<img src={this.state.path} alt=""/>
				</div>

				<h3>Obrázky</h3>
				<div className={styles.currentFiles}>
					{this.state.currentFiles.filter(
						item => {
							const type = this.trimName(item).type.toLowerCase()
							return this.pictureTypes.includes(type)
						}).map((file, key) => (
						<a className={styles.fileHref} href={this.baseName + this.trimName(file).fullname} key={key}>{this.trimName(file).name}</a>
					))}
				</div>
				
				<h3>Dokumenty</h3>
				<div className={styles.currentFiles}>
					{this.state.currentFiles.filter(
						item => {
							const type = this.trimName(item).type.toLowerCase()
							return ! (type === "png" || type === "jpg" || type === "jpeg")
						}).map((file, key) => (
						<a className={styles.fileHref} href={this.baseName + this.trimName(file).fullname} key={key}>{this.trimName(file).name}</a>
					))}
				</div>

			</div>	
		)
	}
}

export default UploadScene