import SectionWrapper from '../SectionWrapper/SectionWrapper'
import whatsappLogo from '../../assets/whatsapp.png'
import './ContactSection.css'

const ContactSection = () => {
  return (
    <SectionWrapper id="kontakt" className="contact" ariaLabelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">Napisz do nas - jeszcze dziś dobierzemy grupę!</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon phone" aria-hidden="true">
              📞
            </div>
            <a className="pill whatsapp" href="https://wa.me/48512253179" target="_blank" rel="noreferrer">
              <img src={whatsappLogo} alt="" aria-hidden="true" className="pill-icon-img" />
              <div className="pill-text">
                <span className="pill-sub">Joanna Adamek</span>
                <strong>Whatsapp</strong>
              </div>
              <span className="pill-badge">Online</span>
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon mail" aria-hidden="true">
              ✉️
            </div>
            <a className="pill email" href="mailto:kontakt@joannaadamek.edu.pl">
              <strong>E-mail</strong>
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default ContactSection
