import { Link } from 'react-router-dom'
import SectionWrapper from '../SectionWrapper/SectionWrapper'
import './LanguagesSection.css'

const LanguagesSection = () => {
  return (
    <SectionWrapper id="languages" className="languages" ariaLabelledby="languages-title">
      <h2 id="languages-title">
        Wybierz <span>język</span>, który Cię interesuje
      </h2>
      <div className="language-grid">
        <Link className="language-card" to="/niemiecki">
          NIEMIECKI
        </Link>
        <Link className="language-card" to="/angielski">
          ANGIELSKI
        </Link>
      </div>
    </SectionWrapper>
  )
}

export default LanguagesSection
