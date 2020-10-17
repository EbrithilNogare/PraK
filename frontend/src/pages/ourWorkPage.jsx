import React from "react"

import {
	Paper,
} from '@material-ui/core'

import styles from "./ourWork.module.scss"


class OurWorkPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			isLoaded: false,
			data: [],
		}
	}

	componentDidMount(){
		// todo load data from DB
		// fetch() ...

		// ! temp below
		this.setState({
            isLoaded: true,
            data: [
				{title: "Software", img: "imgUrl", subTitle: "Systém evidence, zpracování a prezentace regionálních informačních pramenů", description: "Návrh a implementace software (NAKI kód R) pro agregaci metadat, který za použití formální konceptuální analýzy bude odpovídat na dotazy uživatele. Za tímto účelem vznikne jazyk, který bude moci pohodlně používat i neprogramátor. Nejistotu v kategorizaci nasbíraného materiálu bude možné vystihnout fuzzy rozšířením analýzy. Formální kontext v pozadí analýzy může být buď generován automaticky (slovní analýzou dokumentů) nebo ručně. Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů, držitelé sbírek, místní krkonošské zájmové komunity, krkonošská turistická infocentra. Plánovaný termín dokončení: konec roku 2022"},
				{title: "Mapy", img: "imgUrl", subTitle: "Výsledky projektu budou prezentovány ve třech interaktivních specializovaných odborných mapách (NAKI kód Nmap)", description: "Výsledky projektu budou prezentovány ve třech interaktivních specializovaných odborných mapách (NAKI kód Nmap) Obyvatelstvo, obce a správní systém Krkonoš ve 20. století Specializovaná interaktivní odborná mapa bude na několika vrstvách zobrazovat demografcké a správní proměny Krkonoš ve 20. století. Jejími vrstvami budou: 1. Obce (proměny místopisu, počtu a národnostního složení jejich obyvatel). 2. Okresy (proměny správního systému). 3. Časová úroveň podle jednotlivých etap (vymezených obecně sčítáními lidu, resp. změnami systému veřejné správy). Vrstvy bude možné vzájemně kombinovat. Mapa zároveň ukáže, jak je možné využít specializovanou databázi (výsledek S), neboť s ní bude provázána formou odkazů na zdrojové informace za pomoci software (výsledek R). Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů Plánovaný termín dokončení: konec roku 2021 Významné ekonomické subjekty a dopravní infrastruktura Krkonoš ve 20. století Specializovaná interaktivní odborná mapa bude na několika vrstvách zobrazovat proměny charakteru významných hospodářských subjektů Krkonoš ve 20. století. Jejími vrstvami budou: 1. Významní držitelé půdy 2. Významné subjekty sekundárního a terciárního sektoru 3. Dopravní infrastruktura (silnice a železnice). 4. Časová úroveň podle jednotlivých etap (kopírující významné změny v politicko-ekonomické struktuře státu, orientačně přibližně po dekádách). Vrstvy bude možné vzájemně kombinovat. Mapa zároveň ukáže, jak je možné využít specializovanou databázi (výsledek S), neboť s ní bude provázána formou odkazů na zdrojové informace za pomoci software (výsledek R). Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů Relevantní sbírky corcontic v Evropě Specializovaná interaktivní odborná mapa přehledně znázorní relevantní sbírky corcontic v ČR a jinde v Evropě. Jejími vrstvami budou: 1. Umístění hlavních sbírek (zobrazení umístění na mapě, včetně informace o povaze sbírky obsahu, rozsahu a dostupnosti). 2. Typologie sbírek dle držitele (instituce veřejné správy, paměťové instituce, soukromé sbírky). 3. Časová typologie sbírek (podle období, ke kterému se sbírka zejména vztahuje). 4. Typologie sbírek podle předmětu (téma, ke kterému se sbírka vztahuje – bude provázáno s klíčovými slovy databáze. Mapa zároveň ukáže, jak je možné využít specializovanou databázi (výsledek S), neboť s ní bude provázána formou odkazů na zdrojové informace za pomoci software (výsledek R). Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů, paměťové instituce, muzea, knihovny, držitelé "},
				{title: "Výstava", img: "imgUrl", subTitle: "Krkonoše v pramenech, prameny v Krkonoších: obraz Krkonoš v pramenech 20. století", description: "Putovní výstava bude prezentovat digitální podobu vybraných corcontic. Výstava bude postavena na třech průřezových a obsahově propojených linkách: 1. Ukáže cestu od pramene - corcontica (který je místně, jazykově, typově a institucionálně izolovaný) k odbornému článku, resp. publikačním výstupům. 2. Bude prezentovat specifcké (atypické) regionální prameny - corcontica na základě typologie regionálních pramenů. 3. Demonstruje technologické, digitální možnosti prezentace pramenů. Kritický katalog k výstavě přinese přehled všech položek realizované výstavy. Bude obsahovat informaci o původu a umístění každé položky, její stručnou charakteristiku. Součástí katalogu bude i úvodní studie charakterizující a typologizující jednotlivé pramenné zdroje, možnosti jejich využití atd. Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, návštěvníci muzeí/institucí, kde bude výstava instalována, držitelé sbírek, místní krkonošské zájmové komunity, krkonošská turistická infocentra, učitelé a žáci středních škol v regionu, pedagogové a studenti vysokých škol. Plánovaný termín dokončení: léto roku 2021"},
				{title: "Veřejná databáze", img: "imgUrl", subTitle: "Prameny Krkonoš", description: "Veřejná specializovaná databáze (NAKI kód S) bude poskytovat strukturovanou informaci o existenci, typu, obsahu a dostupnosti důležitých corcontic, jmenný, věcný a místní rejstřík a historicko obsahové informace využitelné pro tvorbu map. Uživatele bude informovat o relevantnosti zdrojů prostřednictvím klíčových slov (německy a česky) a anotací (česky, u vybraných, důležitých zdrojů i německy). Databáze bude napojena na databázi Bibliografi české historie HÚ AV ČR, a to oběma směry (tedy bude z databáze HÚ AV ČR čerpat, ale současně do ní bude dodávat další regionálně specifcké podklady). Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů, držitelé sbírek, místní krkonošské zájmové komunity, krkonošská turistická infocentra, učitelé a žáci středních škol, pedagogové a studenti vysokých škol. Plánovaný termín dokončení: konec roku 2022"},
				{title: "Vědecká konference", img: "imgUrl", subTitle: "Krkonoše v proměnách 20. století", description: "Jednodenní vědecká konference bude zejména odborné veřejnosti a regionálním zájemcům prezentovat současný stav aplikovaného výzkumu realizovaného projektem. Demonstruje zejména šíři informačních zdrojů k dějinám Krkonoš ve 20. století a možnosti jejich interdisciplinární interpretace. Stejně tak bude prezentováno technologické řešení projektu. Předpokládaní budoucí uživatelé: vědecká a badatelská veřejnost v ČR a SRN, pedagogové a studenti vysokých škol, držitelé sbírek, místní krkonošské zájmové komunity, krkonošská turistická infocentra. Plánovaný termín dokončení: léto roku 2021 "},
				{title: "Kolektivní monografe", img: "imgUrl", subTitle: "Krkonoše v proměnách 20. století", description: "Kolektivní monografe (NAKI kód B) vznikne v řešitelském týmu v reakci na v roce 2021 uspořádanou mezioborovou konferenci. Analyzuje správní, demografcký, hospodářský, sociální a národnostní vývoj Krkonoš ve 20. století. Bude obsahovat také informace o projektu, včetně popisu fungování a možného využití vytvářené veřejné specializované databáze a vytvářeného software. Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů, držitelé sbírek, místní krkonošské zájmové komunity, krkonošská turistická infocentra Plánovaný termín dokončení: konec roku 2022"},
				{title: "Odborné články", img: "imgUrl", subTitle: "", description: "Výstupy projektu jsou také nejméně čtyři odborné články publikované ve vědeckých časopisech. Předpokládaní budoucí uživatelé: Výzkumné organizace, vědecká a badatelská veřejnost v ČR a SRN, studenti historických oborů, držitelé sbírek, místní krkonošské zájmové komunity. Plánovaný termín dokončení: roky 2021-2022 Již publikované odborné články:"},
			]
		})
	}

	render(){
		return(
			<Paper className={styles.root}>
				<h1>Výstupy</h1>
				<p>Hlavními výstupy projektu jsou odborný software, tři interaktivní odborné mapy a výstava s kritickým katalogem. Vedlejšími výstupy jsou specializovaná databáze, vědecká konference, kolektivní monografe a nejméně čtyři odborné články ve vědeckých časopisech.</p>
				<div className={styles.columns}>
					{this.state.data.map((value, key) => OutputCard({value, key}))}
				</div>
			</Paper>
		)
	}
}

function OutputCard(props){
	return <div key={props.key} className={styles.outputCard}>
		<Paper className={styles.picture} style={{height:"100px"}}>{props.value.img}</Paper>
		<div className={styles.title}>{props.value.title}</div>
		<div className={styles.subTitle}>{props.value.subTitle}</div>
		<div className={styles.description}>{props.value.description}</div>
	</div>
}


export default OurWorkPage