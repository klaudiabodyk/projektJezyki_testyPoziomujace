import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SectionWrapper from '../SectionWrapper/SectionWrapper'
import './LanguagesSection.css'

const LanguagesSection = () => {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="languages" className="languages" ariaLabelledby="languages-title">
      <h2 id="languages-title">
        {t('languages.title')} <span>{t('languages.titleHighlight')}</span> {t('languages.titleEnd')}
      </h2>
      <div className="language-grid">
        <Link className="language-card" to="/niemiecki">
          {t('languages.german')}
        </Link>
        <Link className="language-card" to="/angielski">
          {t('languages.english')}
        </Link>
      </div>
    </SectionWrapper>
  )
}

export default LanguagesSection
