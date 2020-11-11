import React from "react"

import { 
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@material-ui/core'

class FormStaticComboBox extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			value1: "",
			value2: "",
			value3: "",
		}	
	}

	handleChangeFirst = event => {
		this.setState({
			value1: event.target.value,
			value2: "",
			value3: "",
		})

		if(this.props.onChange) this.props.onChange({...event, target:{...event.target, value:event.target.value}})
	}
	handleChangeSecond = event => {
		this.setState({
			value2: event.target.value,
			value3: "",
		})

		if(this.props.onChange) this.props.onChange(event)
	}
	handleChangeThird = event => {
		this.setState({value3: event.target.value})

		if(this.props.onChange) this.props.onChange(event)
	}

	render(){
		return(<div>
			<FormControl style={{width: "100%"}}>
				<InputLabel id="select-label1">{this.props.label[0].toUpperCase() + this.props.label.slice(1)}</InputLabel>
				<Select
					name={this.props.name}
					labelId="select-label1"
					onChange={this.handleChangeFirst}
					value={this.state.value1}
					required={this.props.required}
					style={{width: "100%"}}
					inputProps={{
						realvalue:this.state.ID,
					}}
					endAdornment={this.props.InputProps && this.props.InputProps.endAdornment ? this.props.InputProps.endAdornment : undefined}
					>
					{Object.keys(formSpecificData).map((value, key)=>(
						<MenuItem key={key} value={value}>{value}</MenuItem>
					))}
				</Select>
			</FormControl>
			{ this.state.value1 !== "" && Array.isArray(formSpecificData[this.state.value1])===false && <FormControl style={{width: "100%"}}>
				<InputLabel id="select-label2">{this.props.label[0].toUpperCase() + this.props.label.slice(1) + ": " + this.state.value1}</InputLabel>
				<Select
					name={this.props.name}
					labelId="select-label2"
					onChange={this.handleChangeSecond}
					value={this.state.value2}
					required={this.props.required}
					style={{width: "100%"}}
					inputProps={{
						realvalue:this.state.ID,
					}}
					endAdornment={this.props.InputProps && this.props.InputProps.endAdornment ? this.props.InputProps.endAdornment : undefined}
					>
					{Object.keys(formSpecificData[this.state.value1]).map((value, key)=>(
						<MenuItem key={key} value={value}>{value}</MenuItem>
					))}
				</Select> 
			</FormControl>}
			{ this.state.value2 !== "" && Array.isArray(formSpecificData[this.state.value1][this.state.value2])===false && <FormControl style={{width: "100%"}}>
				<InputLabel id="select-label3">{this.props.label[0].toUpperCase() + this.props.label.slice(1) + ": " + this.state.value2}</InputLabel>
				<Select
					name={this.props.name}
					labelId="select-label3"
					onChange={this.handleChangeThird}
					value={this.state.value3}
					required={this.props.required}
					style={{width: "100%"}}
					inputProps={{
						realvalue:this.state.ID,
					}}
					endAdornment={this.props.InputProps && this.props.InputProps.endAdornment ? this.props.InputProps.endAdornment : undefined}
					>
					{Object.keys(formSpecificData[this.state.value1][this.state.value2]).map((value, key)=>(
						<MenuItem key={key} value={value}>{value}</MenuItem>
					))}
				</Select> 
			</FormControl>}
		</div>)
	}
}


const formSpecificData = {
	"Archivní prameny":{
		"Archivní prameny":{
			"Aktové dokumenty": [1,1,0,0,0,0,0,0,0,0],
			"Ankety": [1,1,0,0,0,0,0,0,0,0],
			"Archiválie": [1,1,0,0,0,0,0,0,0,0],
			"Demoliční výměry": [1,1,0,0,0,0,0,0,0,0],
			"Deníky": [1,1,0,0,0,0,0,0,1,0],
			"Diplomy": [1,1,0,0,0,0,0,0,0,0],
			"Domovní knihy": [1,1,0,0,0,0,0,0,1,0],
			"Dopisy": [1,1,0,0,0,0,0,0,0,0],
			"Dotazníky": [1,1,0,1,0,0,0,0,0,0],
			"Elenchy": [1,1,0,0,0,0,0,0,1,0],
			"Evidenční listy": [1,1,0,0,0,0,0,0,0,0],
			"Fascikly": [1,1,0,0,0,0,0,0,1,0],
			"Formuláře": [1,1,0,0,0,0,0,0,0,0],
			"Historické dokumenty": [1,1,0,0,0,0,0,0,0,0],
			"Hospodářské knihy": [1,1,0,0,0,0,0,0,1,0],
			"Investiční záměry": [1,1,0,0,0,0,0,0,0,0],
			"Kartony": [1,1,0,0,0,0,0,0,0,0],
			"Kartotéční lístky": [1,1,0,0,0,0,0,0,0,0],
			"Katastry": [1,1,0,0,0,0,0,0,0,0],
			"Knihy evidence obyvatalstva": [1,1,0,0,0,0,0,0,1,0],
			"Knihy s přívazky": [1,1,0,0,0,0,0,0,1,0],
			"Konvoluty": [1,1,0,0,0,0,0,0,1,0],
			"Kopiáře": [1,1,0,0,0,0,0,0,0,0],
			"Korespondeční lístky": [1,1,0,0,0,0,0,0,0,0],
			"Korespondence": [1,1,0,0,0,0,0,0,0,0],
			"Kramářské tisky": [1,1,0,0,0,0,0,0,1,0],
			"Kroniky": [1,1,0,0,0,0,0,0,1,0],
			"Listiny": [1,1,0,0,0,0,0,0,0,0],
			"Manifesty": [1,1,0,0,0,0,0,0,1,0],
			"Matriky narozený, oddaných, zemřelých farnosti": [1,1,0,0,0,0,0,0,1,0],
			"Městské kroniky": [0,0,0,0,0,0,0,0,0,0],
			"Nepublikované diplomové, doktorské a habilitační práce": [1,1,0,0,0,0,0,0,1,0],
			"Novoročenky": [1,1,0,0,0,0,0,0,0,0],
			"Osobní korespondence": [0,0,0,0,0,0,0,0,0,0],
			"Památníky": [1,1,0,0,0,0,0,0,1,0],
			"Pamětní listy": [1,1,0,0,0,0,1,0,0,0],
			"Paměti": [0,0,0,0,0,0,0,0,0,0],
			"Pamětní zápisy, čestné listiny, pamětní alba, pamětní desky": [1,1,0,0,0,0,0,0,0,0],
			"Petice": [1,1,0,0,0,0,0,0,0,0],
			"Podací protokoly": [1,1,0,0,0,0,0,0,0,0],
			"Politické tisky": [0,0,0,0,0,0,0,0,0,0],
			"Pozemkové knihy": [1,1,0,0,0,0,0,0,1,0],
			"Pozvánky": [1,1,0,0,0,0,0,0,0,0],
			"Prameny": [1,1,0,0,0,0,0,0,0,0],
			"Právní dokumenty": [1,1,0,0,0,0,0,0,0,0],
			"Programy": [1,1,0,0,0,0,0,0,1,0],
			"Projektové dokumenty": [1,1,0,0,0,0,0,0,0,0],
			"Proklamace a memoranda": [1,1,0,1,0,1,0,0,1,0],
			"Protokoly": [1,1,0,0,0,0,0,0,0,0],
			"Repertáře": [1,1,0,0,0,0,0,0,1,0],
			"Reprodukce faksimilií": [1,1,0,0,0,0,1,0,0,0],
			"Rukopisy": [1,1,0,0,0,0,0,0,1,0],
			"Rukopisy v digitální podobě": [1,1,0,0,0,0,0,0,1,0],
			"Sbírky": [1,1,0,0,0,0,0,0,0,0],
			"Sčítací operáty": [1,1,0,0,0,0,0,0,1,0],
			"Školní díla": [1,1,0,0,0,0,0,0,1,0],
			"Školní kroniky": [0,0,0,0,0,0,0,0,0,0],
			"Soukromá korespondence": [1,1,0,0,0,0,0,0,0,0],
			"Soupisy duší": [1,1,0,0,0,0,0,0,1,0],
			"Spisy": [1,1,0,0,0,0,0,0,1,0],
			"Správní knihy": [1,1,0,0,0,0,0,0,1,0],
			"Stanovy": [1,1,0,0,0,0,0,0,1,0],
			"Statistická šetření": [1,1,0,0,0,0,0,0,1,0],
			"Statuty": [1,1,0,0,0,0,0,0,1,0],
			"Studie stavby": [1,1,0,0,0,0,0,0,0,0],
			"Tabulky": [1,1,0,0,0,0,0,0,0,0],
			"Taneční pořádky": [1,1,0,0,0,0,0,0,0,0],
			"Technické výkresy": [1,1,0,0,0,0,0,0,0,0],
			"Technické zprávy": [1,1,0,0,0,0,0,0,1,0],
			"Tiskopisy": [1,1,0,0,0,0,0,0,0,0],
			"Trestní spisy": [1,1,0,0,0,0,0,0,0,0],
			"Účetní knihy": [1,1,0,0,0,0,0,0,1,0],
			"Účty": [1,1,0,0,0,0,0,0,0,0],
			"Úrbáře": [0,1,0,0,0,0,0,0,0,0],
			"Úřední knihy": [1,1,0,0,0,0,0,0,1,0],
			"Úřední knihy v digitální podobě": [1,1,0,0,0,0,0,0,1,0],
			"Válečné deníky": [1,1,0,0,0,0,0,0,1,0],
			"Vesnické kroniky": [0,0,0,0,0,0,0,0,0,0],
			"Výroční zprávy": [0,0,0,0,0,0,0,0,0,0],
			"Vyznamenání": [1,1,0,0,0,0,0,0,0,0],
			"Zápisy ze schůzí": [1,1,0,0,0,0,0,0,0,0],
			"Zápisky": [0,0,0,0,0,0,0,0,0,0],
			"Záznamy z jednání": [1,1,0,0,0,0,0,0,0,0]
		},
		"Mapy": {
			"Císařské otisky": [1,1,0,0,0,0,0,0,1,0],
		}
	},
	"Audiovizuální dokumenty":{
		"Audiovizuální dokumenty": [0,0,1,0,0,0,0,0,0,0],
		"CD": [1,1,1,0,0,0,0,0,0,0],
		"CD-ROM": [0,0,1,0,0,0,0,0,0,0],
		"Diskety": [0,0,1,0,0,0,0,0,0,0],
		"DVD": [0,0,1,0,0,0,0,0,0,0],
		"DVD-ROM": [0,0,1,0,0,0,0,0,0,0],
		"Filmové pásy": [0,0,1,0,0,0,0,0,0,0],
		"Filmy": [1,0,1,0,0,0,0,0,0,0],
		"Gramofonové desky": [0,0,1,0,0,0,0,0,0,0],
		"Kinematografické záznamy": [0,0,1,0,0,0,0,0,0,0],
		"Kinofilmy": [0,0,1,0,0,0,0,0,0,0],
		"Kompaktní disky": [0,0,1,0,0,0,0,1,1,0],
		"Magnetofonové kazety": [0,0,1,0,0,0,0,0,0,0],
		"Mikrofilmy": [1,1,1,1,0,1,1,1,0,0],
		"Mikrofiše": [1,1,1,1,0,1,1,1,1,0],
		"Němé filmy": [0,0,0,0,0,0,0,0,0,0],
		"Rozhlasové pořady": [0,0,0,0,0,0,0,0,0,0],
		"Svitkové filmy": [0,0,1,0,0,0,0,0,0,0],
		"Televizní pořady": [0,0,0,0,0,0,0,0,0,0],
		"Videozáznamy": [0,0,0,0,0,0,0,0,0,0],
		"Zvukové dokumenty": [0,0,0,0,0,0,0,0,0,0],
		"Zvukové filmy": [0,0,0,0,0,0,0,0,0,0],
		"Zvukové kazety": [0,0,1,0,0,0,0,0,0,0],
		"Zvukové záznamy": [0,0,1,0,0,0,0,0,0,0],
	},
	"Biografie":{
		"Paměti regionálních osobností": [0,0,0,0,0,0,0,0,0,0],
		"Vzpomínky rodáků": [1,1,0,1,0,1,0,0,1,0],
		"Autobiografie": [1,1,0,0,0,0,0,0,1,0],
		"Biografie": [1,1,0,1,0,1,0,0,1,0],
	},
	"Články":{
		"Články": [1,0,0,1,0,1,0,0,0,0],
		"Článek v elektronickém časopise": [0,0,0,0,0,0,0,0,0,0],
		"Článek na webové stránce": [0,0,0,0,0,0,0,0,0,0],
		"Články v odborných časopisech": [0,0,0,1,0,0,0,0,0,0],
		"Články v regionálním tisku": [0,0,0,0,0,0,0,0,0,0],
		"Fejetony": [0,0,0,1,0,1,0,0,0,0],
		"Jubilejní články": [1,0,0,1,0,1,0,0,0,0],
		"Nekrology": [1,1,0,1,0,1,0,0,0,0],
		"Novinové články": [0,0,0,1,0,0,0,0,0,0],
		"Recenze": [1,0,0,1,0,1,0,0,1,0],
		"Separáty, zvláštní otisky": [1,0,0,1,0,1,0,0,0,0],
		"Sloupky": [0,0,0,1,0,1,0,0,0,0],
	},
	"Online zdroje":{
		"Databáze": [0,0,0,0,1,0,0,0,0,0],
		"Datové sety": [0,0,0,0,0,0,0,0,0,0],
		"Digitální archivy": [0,0,0,0,1,0,0,0,0,0],
		"Digitální knihovny": [0,0,0,0,1,0,0,0,0,0],
		"Elektronické knihy": [0,0,0,0,0,0,0,0,1,0],
		"Elektronické zdroje": [1,1,1,1,1,1,1,1,1,0],
		"Internetové zdroje": [0,0,0,0,1,0,0,0,0,0],
		"Mapové portály": [0,0,0,0,1,0,0,0,0,0],
		"Online zdroje": [1,1,1,1,1,1,1,1,1,0],
		"Portály": [0,0,0,0,1,0,0,0,0,0],
		"Webové stránky": [0,0,0,0,1,0,0,0,0,0],
	},
	"Firemní literatura":{
		"Firemní časopisy": [1,1,0,0,0,0,0,1,0,0],
		"Firemní drobný tisk": [1,1,0,0,0,0,0,0,0,0],
		"Firemní katalogy": [1,1,1,0,1,0,1,1,1,0],
		"Firemní literatura": [1,1,1,0,1,0,1,1,1,0],
		"Firemní tisky": [1,1,0,0,0,0,1,1,1,0],
	},
	"Fondy/sbírky":{
		"Aarchivní fondy": [0,1,0,0,0,0,0,0,0,0],
		"Archivní fondy spolků": [0,0,0,0,0,0,0,0,0,0],
		"Institucionální sbírky": [0,1,0,0,0,0,0,0,0,0],
		"Muzejní sbírky": [0,1,0,0,0,0,0,0,0,0],
		"Osobní fondy": [0,1,0,0,0,0,0,0,0,0],
		"Soukromé sbírky": [0,1,0,0,0,0,0,0,0,0],
		"Úřední fondy": [1,1,0,0,0,0,0,0,0,0],
	},
	"Fotografie":{
		"Barevné fotografie": [1,1,0,0,0,0,1,0,0,0],
		"Černobílé fotografie": [1,1,0,0,0,0,1,0,0,0],
		"Fotoalba": [1,1,0,0,0,0,1,0,1,0],
		"Fotogalerie": [0,0,0,0,1,0,0,0,0,0],
		"Fotografické desky": [1,1,0,0,0,0,1,0,0,0],
		"Fotografické publikace": [1,1,0,0,0,0,0,0,1,0],
		"Fotografie": [1,1,1,1,1,1,1,1,1,0],
		"Fotografie listiny": [1,1,0,0,0,0,1,0,0,0],
		"Fotografie na papírové podložce": [1,1,0,0,0,0,0,0,0,0],
		"Fotografie prošlá poštovním stykem": [1,1,0,0,0,0,0,0,0,0],
		"Fotografie v digitální podobě": [1,1,0,0,0,0,1,0,0,0],
		"Interiéry": [0,0,0,0,0,0,1,0,0,0],
		"Letecké snímky": [1,1,0,0,0,0,1,0,0,0],
		"Reprodukce fotografií": [1,1,0,0,0,1,0,0,0,0],
		"Soubory fotografií": [1,1,0,0,0,0,1,0,0,0],
	},
	"Hry":{
		"Hry (společenské)": [0,0,0,0,0,0,1,0,1,0],
	},
	"Kalendáře":{
		"Almanachy": [1,0,0,0,0,0,0,0,1,0],
		"Diáře": [1,1,0,0,0,0,0,0,1,0],
		"Kalendáře": [1,1,0,0,0,0,1,1,1,0],
		"Nástěnné jednolisté kalendáře": [0,0,0,0,0,0,1,1,0,0],
		"Nástěnné vícelisté kalendáře": [0,0,0,0,0,0,0,1,0,0],
		"Školní katalogy, almanachy": [0,0,0,0,0,0,0,1,1,0],
		"Stolní kalendáře": [0,0,0,0,0,0,0,1,0,0],
		"Zápisníky": [1,1,0,0,0,0,0,0,1,0],
	},
	"Mapy":{
		"Autoatlasy": [0,0,0,0,0,0,0,0,1,0],
		"Automapy": [0,0,0,0,0,1,1,0,0,0],
		"Cykloturistické mapy": [0,0,0,0,0,0,1,0,0,0],
		"Demografické mapy": [1,1,0,0,0,1,1,0,0,0],
		"Díla mapová státní": [1,1,0,0,0,0,1,0,0,0],
		"Dopravní mapy": [1,1,0,0,0,1,1,0,0,0],
		"Etnografické mapy": [1,1,0,0,0,1,1,0,0,0],
		"Fotomapy": [0,0,0,0,0,0,0,0,0,0],
		"Geografické atlasy": [0,0,0,0,0,0,0,0,1,0],
		"Historické mapy": [1,1,0,0,0,1,1,0,0,0],
		"Hospodářské mapy": [1,1,0,0,0,1,1,0,0,0],
		"Indikační skici": [1,1,0,0,0,0,0,0,0,0],
		"Katastrální mapy": [1,1,0,0,0,1,1,0,0,0],
		"Konstrukční a stavební nákresy": [1,1,0,0,0,0,0,0,0,0],
		"Lyžařské mapy": [1,1,0,0,0,1,1,0,0,0],
		"Mapová faksimilia": [1,1,0,0,1,1,1,0,0,0],
		"Mapy": [1,1,1,1,1,1,1,1,1,0],
		"Mapy katastru": [1,1,0,0,0,1,1,0,0,0],
		"Mapy obyvatelstva": [1,1,0,0,0,1,1,0,0,0],
		"Mapy okresů": [1,1,0,0,0,1,1,0,0,0],
		"Mapy s brožurou": [1,1,0,0,0,0,1,0,1,0],
		"Mapy sídel": [1,1,0,0,0,1,1,0,0,0],
		"Mapy spojů": [1,1,0,0,0,1,1,0,0,0],
		"Mapy stabilního katastru Čech": [1,1,0,0,0,0,1,0,0,0],
		"Nástěnné mapy": [1,1,0,0,0,0,1,0,0,0],
		"Plány měst": [1,1,0,0,0,1,1,0,0,0],
		"Politické a správní mapy": [1,1,0,0,0,1,1,0,0,0],
		"Regionální mapy": [1,1,0,0,0,1,1,0,0,0],
		"Rukopisné plány": [1,1,0,0,0,1,1,0,0,0],
		"Silniční mapy": [1,1,0,0,0,1,1,0,0,0],
		"Skici a kresby map": [0,0,0,0,0,0,0,0,0,0],
		"Specializované mapy": [0,0,0,0,0,0,0,0,0,0],
		"Stavební plány": [1,1,0,0,0,0,0,0,0,0],
		"Turistické mapy": [1,1,0,0,0,1,1,0,0,0],
		"Vojenské mapy": [1,1,0,0,0,1,1,0,0,0],
		"Základní mapy": [1,1,0,0,0,0,1,0,0,0],
		"Železniční mapy": [1,1,0,0,0,1,1,0,0,0],
		"Zemědělské mapy": [1,1,0,0,0,1,1,0,0,0],
	},
	"Naučná literatura":{
		"Brožury": [0,0,0,0,0,0,0,0,1,0],
		"Část svazku": [0,0,0,0,0,0,0,0,0,0],
		"Chronologické přehledy": [1,1,0,0,0,0,0,0,1,0],
		"Elektronické knihy": [0,0,0,0,0,0,0,0,0,0],
		"Encyklopedie": [0,0,0,0,0,0,0,0,1,0],
		"Exilový tisk": [1,1,0,0,0,0,0,1,0,0],
		"Folklorní sběry": [0,0,0,0,0,0,0,0,0,0],
		"Historické spisy": [0,0,0,0,0,0,0,0,0,0],
		"Informační publikace": [1,1,0,0,0,0,0,0,1,0],
		"Jubilejní tisky": [1,1,0,0,0,0,0,1,1,0],
		"Kapitola v knize": [0,0,0,0,0,0,0,0,0,0],
		"Knihy": [1,1,0,0,0,0,0,0,1,0],
		"Komentáře": [1,0,0,1,0,1,0,0,1,0],
		"Komentovaná vydání": [0,0,0,0,0,1,0,0,1,0],
		"Kritická vydání": [0,0,0,0,0,0,0,0,1,0],
		"Kritické zprávy": [0,0,0,0,0,0,0,0,1,0],
		"Kritický katalog výstavy": [0,0,0,0,0,0,0,0,1,0],
		"Kritiky": [1,1,0,1,0,1,0,0,0,0],
		"Kuchařské předpisy": [1,1,0,1,0,1,0,0,0,0],
		"Metodiky": [0,0,0,0,0,0,0,0,1,0],
		"Monografie": [0,0,0,0,0,0,0,0,1,0],
		"Názory": [1,1,0,1,0,1,0,0,1,0],
		"Obrazové publikace": [0,0,0,0,0,0,1,0,1,0],
		"Patentová literatura": [1,1,0,0,0,0,0,0,0,0],
		"Pojednání": [0,0,0,1,0,0,0,0,1,0],
		"Polemiky": [1,1,0,1,0,1,0,0,1,0],
		"Populárně-naučné publikace": [0,0,0,0,0,0,0,0,1,0],
		"Přednášky": [1,1,0,1,0,0,0,0,1,0],
		"Přehledy": [1,1,0,0,0,0,0,1,1,0],
		"Případové studie": [0,0,0,0,0,0,0,0,1,0],
		"Příspěvek ve sborníku": [0,0,0,0,0,0,0,0,0,0],
		"Příspěvek z konference": [0,0,0,0,0,0,0,0,0,0],
		"Průvodce": [0,0,0,0,0,0,0,0,1,0],
		"Rozhovory": [1,1,0,0,0,1,0,0,1,0],
		"Sborníky": [0,0,0,0,0,0,0,1,1,0],
		"Sborníky konferencí": [0,0,0,0,0,0,0,0,1,0],
		"Neperiodické spolkové tisky": [0,0,0,0,0,0,0,0,0,0],
		"Srovnávací studie": [0,0,0,0,0,0,0,0,1,0],
		"Stati": [1,1,0,1,0,0,0,0,1,0],
		"Statistiky": [1,1,0,1,0,1,0,0,1,0],
		"Studie": [0,0,0,0,0,0,0,0,1,0],
		"Učebnice": [0,0,0,0,0,0,0,0,1,0],
		"Učebnice pro menšinové školy": [0,0,0,0,0,0,0,0,0,0],
		"Vlastivědné sborníky": [0,0,0,0,0,0,0,1,1,0],
		"Výňatky": [1,1,0,0,0,1,0,0,1,0],
		"Výroční sborníky": [0,0,0,0,0,0,0,0,0,0],
		"Výstřižky": [1,1,0,0,0,0,0,0,0,0],
		"Výzkumné zprávy": [1,1,0,0,0,0,0,0,1,0],
	},
	"Normálie":{
		"Normálie": [1,1,0,0,0,0,0,0,1,0],
		"Normativní dokumenty": [1,1,0,0,0,0,0,0,1,0],
		"Organizační řády": [1,1,0,1,0,1,0,0,1,0],
		"Právní (legislativní) dokumenty": [1,1,0,0,0,0,0,0,0,0],
		"Právní předpisy": [1,1,0,0,0,0,0,0,0,0],
		"Předpisy": [1,1,0,1,0,1,0,0,1,0],
		"Směrnice": [1,1,0,0,0,0,0,0,1,0],
		"Vyhlášky": [1,1,0,0,0,0,0,0,1,0],
		"Zákony": [1,1,0,0,0,0,0,0,1,0],
	},
	"Periodika":{
		"Periodika":{
			"Bulletiny": [0,0,0,0,0,0,0,1,0,0],
			"Časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Časopisy menšin": [0,0,0,0,0,0,0,1,0,0],
			"Časopisy orgánů státní správy": [0,0,0,0,0,0,0,1,0,0],
			"Časopisy politických stran a hnutí": [0,0,0,0,0,0,0,1,0,0],
			"Časopisy pro volný čas": [0,0,0,0,0,0,0,1,0,0],
			"Časopisy zájmových sdružení a spolků": [0,0,0,0,0,0,0,1,0,0],
			"Česky psané časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Elektronické časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Kulturně-historické časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Místní časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Nepravá periodika": [0,0,0,0,0,0,0,1,1,0],
			"Noviny": [0,0,0,0,0,0,0,1,0,0],
			"Občasníky": [0,0,0,0,0,0,0,0,0,0],
			"Obecní zpravodaje": [0,0,0,0,0,0,0,1,0,0],
			"Odborné časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Periodické sborníky": [0,0,0,0,0,0,0,1,1,0],
			"Populárně-naučné časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Regionální deníky": [0,0,0,0,0,0,0,1,0,0],
			"Regionální noviny": [0,0,0,0,0,0,0,1,0,0],
			"Ročenky": [0,0,0,0,0,0,0,1,1,0],
			"Společenské časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Spolkové tisky": [0,0,0,0,0,0,0,0,0,0],
			"Ústřední deníky": [0,0,0,0,0,0,0,1,0,0],
			"Vědecké časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Věstníky": [0,0,0,0,0,0,0,1,0,0],
			"Zábavné časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Zájmové časopisy": [0,0,0,0,0,0,0,1,0,0],
			"Zpravodaje": [0,0,0,0,0,0,0,1,0,0],
			"Zpravodaje obecních úřadů": [0,0,0,0,0,0,0,0,0,0],
			"Kulturní plakáty": [1,1,0,0,0,0,1,0,0,0],
		},
		"Plakáty":{
			"Obrazové plakáty": [1,1,0,0,0,0,1,0,0,0],
			"Plakáty": [1,1,0,0,0,0,1,0,0,0],
			"Plakáty společenských akcí": [1,1,0,0,0,0,1,0,0,0],
			"Politické plakáty": [1,1,0,0,0,0,1,0,0,0],
		}
	},
	"Pohlednice":{
		"Blahopřání": [1,1,0,1,0,1,1,0,0,0],
		"Dopisní karty": [1,1,0,0,0,1,1,0,0,0],
		"Místní pohlednice": [1,1,0,0,0,1,1,0,0,0],
		"Pohlednice": [1,1,1,1,1,1,1,1,1,0],
		"Příležitostné pohlednice": [1,1,0,0,0,1,1,0,0,0],
		"Reklamní pohlednice": [1,1,0,0,0,1,1,0,0,0],
		"Soubory pohlednic": [1,1,0,0,0,1,1,0,0,0],
		"Žánrové pohlednice": [1,1,0,0,0,1,1,0,0,0],
	},
	"Příručkové zdroje":{
		"Příručkové zdroje":{
			"Adresáře": [1,1,0,0,0,0,0,1,1,0],
			"Archivní pomůcky": [0,0,0,0,0,0,0,0,0,0],
			"Bibliografické slovníky": [1,0,0,0,0,0,0,0,1,0],
			"Bibliografie": [1,0,0,0,0,0,0,0,1,0],
			"Biografické slovníky": [0,0,0,0,0,0,0,0,1,0],
			"Číselníky": [1,1,0,1,0,1,0,0,1,0],
			"Geografické slovníky": [0,0,0,0,0,0,0,0,1,0],
			"Inventáře": [1,1,0,0,1,0,0,0,1,0],
			"Kartotéky": [0,1,0,0,0,0,0,0,0,0],
			"Katalogy": [1,1,0,0,1,0,0,0,1,0],
			"Příručkové zdroje": [1,1,1,1,1,1,1,1,1,0],
			"Regionální bibliografie": [0,0,0,0,0,0,0,0,1,0],
			"Rejstříky": [1,1,0,0,1,0,0,0,1,0],
			"Seznamy": [1,1,0,0,1,0,0,0,1,0],
			"Soupisy": [1,1,0,0,1,0,0,0,1,0],
			"Statistické ročenky": [0,0,0,0,0,0,0,1,1,0],
			"Statistické tabulky": [0,0,0,0,0,0,0,0,0,0],
			"Statistiky": [1,1,0,1,0,1,0,0,1,0]
		},
		"Naučná literatura":{
			"Příručky": [0,0,0,0,0,0,0,0,1,0],
		}
	},
	"Sbírkové předměty":{
		"Ex libris, značky vlastníka, monogramy, pečetě": [1,1,0,0,0,0,0,0,0,1],
		"Pamětní předměty": [1,1,0,0,0,0,0,0,0,1],
		"Sbírkové předměty": [1,1,0,0,0,0,0,0,0,1],
	},
	"Soubory":{
		"Antologie": [0,0,0,0,0,0,0,0,1,0],
		"Sebrané spisy": [0,0,0,0,0,0,0,0,1,0],
		"Výbory": [0,0,0,0,0,0,0,0,1,0],
	},
	"Umění":{
		"Beletrie": [0,0,0,0,0,0,0,0,0,0],
		"Divadelní hry": [1,1,0,0,0,0,0,0,1,0],
		"Divadelní programy": [1,1,0,0,0,0,1,0,1,0],
		"Grafické listy": [1,1,0,0,0,0,1,0,0,0],
		"Hudebniny": [0,0,0,0,0,0,0,0,1,0],
		"Katalogy výstav": [0,0,0,0,0,0,1,0,1,0],
		"Kresby": [1,0,0,0,0,0,1,0,0,0],
		"Letáky": [1,1,0,0,0,0,1,0,0,0],
		"Literární rukopisy": [1,1,0,0,0,0,0,0,1,0],
		"Originály uměleckých děl": [1,1,0,0,0,0,1,0,0,0],
		"Poezie": [0,0,0,0,0,0,0,0,0,0],
		"Portréty": [1,1,0,1,0,1,1,0,1,0],
		"Rozhlasové hry": [1,0,0,0,0,0,0,0,1,0],
		"Scénáře": [1,1,0,0,0,0,0,0,1,0],
		"Tištěná leporela": [0,0,0,0,0,0,1,0,1,0],
		"Zpěvníky": [1,1,0,0,0,0,0,0,1,0],
	},
	"Vysokoškolské kvalifikační práce":{
		"Diplomové práce": [0,0,0,0,0,0,0,0,1,0],
		"Habilitační práce": [0,0,0,0,0,0,0,0,1,0],
		"Seminární práce": [0,0,0,0,0,0,0,0,0,0],
		"Vysokoškolské kvalifikační práce": [0,0,0,0,0,0,0,0,1,0],
	},
	"Neviditelné prameny":{
		"Neviditelné prameny": [1,1,1,1,1,1,1,1,1,0],
	}
}

export default FormStaticComboBox