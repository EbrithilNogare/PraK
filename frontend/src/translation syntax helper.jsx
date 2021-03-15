import { withTranslation } from 'react-i18next'
const { t } = this.props
{t("XXXXXX.xxxxxxx")}

const WithHooks = withTranslation()(XXXXXX)
export default function TranslatedComponent(props) { return (
	<React.Suspense fallback="loading">
		<WithHooks {...props}/>
	</React.Suspense>
)}