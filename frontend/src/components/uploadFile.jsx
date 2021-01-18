import React from "react"
import { withSnackbar } from 'notistack'

import { 
	Button,
} from '@material-ui/core'

class UploadFile extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			name: "",
			path: "",
			size: "",
			mimetype: "",
		}

		this.maxSize = 32 * 1024 * 1024 // 32MB
	}

	spawnUploadWindow = () => {

	}

	handleChange = e => {
		if(!e.target.files[0])
			return

		if(e.target.files[0].size > this.maxSize){
			console.info("%cUpload unsuccesful due to file size", "background: #222; color: #bada55", e.target.files[0].size, ">", this.maxSize)
			this.props.enqueueSnackbar("Soubor je příliš veliký", { variant: "error", autoHideDuration: 6000 })
			return
		}

		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		
		fetch('/prak/api/uploads', {
			method: 'PUT',
			body: formData,
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			console.info("%cUpload succesful\n", "background: #222; color: #bada55", response)
			this.props.enqueueSnackbar("Nahrávání úspěšné", { variant: "success", autoHideDuration: 6000 })

			if(this.props.onChange)
				this.props.onChange(response.data)
		})
		.catch((error) => {
			console.info("%cUpload unsuccesful\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Nahrávání se nezdařilo", { variant: "error", autoHideDuration: 6000 })
		})
	}

	render(){
		return(
			<div>
				<Button
					color="primary"
					variant="contained"
					component="label"
				>
					Upload File
					<input
						type="file"
						hidden
						onChange={this.handleChange}
					/>
				</Button>
			</div>			
		)
	}
}

export default withSnackbar(UploadFile)

