import React from "react"

import { withSnackbar } from 'notistack'

import { 
	Paper,
	Button,
} from '@material-ui/core'

import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import styles from './editPage.module.scss'

class EditPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			_id: "",
			pageName: "",
			cs: "",
			en: "",
			lastEdited: null,
			editorState: EditorState.createEmpty(),
		}
	}

	componentDidMount(){
		const url = `/prak/api/pages/${this.props.pageId}`

		fetch(url, {
			method: 'GET',
			headers: {
				'Cache-Control': 'no-cache'
			},
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			const contentBlock = htmlToDraft(response.cs);
			const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			const editorState = EditorState.createWithContent(contentState);
			this.setState({...response, editorState})
		})
		.catch((error) => {
			console.info("%cPages loading unsuccesful\n", "background: #222; color: #bada55", error)
		})
	}

	onEditorStateChange = editorState => { this.setState({editorState}) }

	uploadContent = () => {
		const data = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
		const url = `/prak/api/pages/${this.props.pageId}`

		fetch(url, {
			method: 'PATCH',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({cs: data})
		})
		.then(response => {
			if(!response.ok)
				throw response
			return response.json()
		})
		.then(response => {
			console.info("%cPages saving succesful\n", "background: #222; color: #bada55", response)
			this.props.enqueueSnackbar("Změny uloženy úspěšně", { variant: "success", autoHideDuration: 6000 })
		})
		.catch((error) => {
			console.info("%cPages saving unsuccesful\n", "background: #222; color: #bada55", error)
			this.props.enqueueSnackbar("Ukládání se nezdařilo", { variant: "error", autoHideDuration: 6000 })
		})
	}

	render(){ return(
		<div className={styles.root}>
			<Paper className={styles.content}>
				<Editor
					editorState={this.state.editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={this.onEditorStateChange}
				/>
			</Paper>
			<Paper className={styles.rightPanel}>
				<h4>Název:<br/>{this.state.pageName}</h4>
				<p>ID:<br/>{this.state._id}</p>
				<p>Poslední editace:<br/>{this.state.lastEdited}</p>
				<Button
					variant="contained"
					color="primary"
					onClick={this.uploadContent}
				>
					Uložit změny
				</Button>
			</Paper>
		</div>
	)}
}

export default withSnackbar(EditPage)