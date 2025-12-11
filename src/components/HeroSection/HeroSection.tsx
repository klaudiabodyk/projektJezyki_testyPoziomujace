import SectionWrapper from '../SectionWrapper/SectionWrapper'
import backgroundImg from '../../assets/Background.png'
import './HeroSection.css'

const HeroSection = () => {
  return (
    <SectionWrapper
      className="hero"
      ariaLabelledby="hero-title"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="hero-overlay">
        <h1 id="hero-title">
          TESTY
          <br />
          POZIOMUJĄCE
        </h1>
      </div>
    </SectionWrapper>
  )
}

export default HeroSection
