import React from "react"

import ProgressBar from './components/ProgressBar';
import FieldSet from './components/FieldSet';
import Buttons from './components/Buttons';
import Helper from './components/Helper';
import Statistics from './components/Statistics';

import "./inputScene.scss"

class InputScene extends React.Component {
	render(){
		return(
			<div className="InputScene">
				<ProgressBar/>
				
				<FieldSet/>
				
				<Buttons/>

				<Helper/>
				
				<Statistics/>
			</div>
		)
	}
}

export default InputScene