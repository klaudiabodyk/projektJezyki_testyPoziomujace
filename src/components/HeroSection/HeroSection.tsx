import { useTranslation } from 'react-i18next'
import SectionWrapper from '../SectionWrapper/SectionWrapper'
import backgroundImg from '../../assets/Background.png'
import './HeroSection.css'

const HeroSection = () => {
  const { t } = useTranslation()

  return (
    <SectionWrapper
      className="hero"
      ariaLabelledby="hero-title"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="hero-overlay">
        <h1 id="hero-title">
          {t('hero.title')}
          <br />
          {t('hero.subtitle')}
        </h1>
      </div>
    </SectionWrapper>
  )
}

export default HeroSection
