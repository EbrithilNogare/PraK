import { React } from 'react'
import { withTranslation } from 'react-i18next'
const { t } = this.props
{
    t('XXXXXX.xxxxxxx')
}

const WithHooks = withTranslation()('XXXXXX')
export default function TranslatedComponent(props) {
    return (
        <React.Suspense fallback="">
            <WithHooks {...props} />
        </React.Suspense>
    )
}
