import { useTranslation } from 'react-i18next'
import SectionWrapper from '../SectionWrapper/SectionWrapper'
import whatsappLogo from '../../assets/whatsapp.png'
import { trackContactClick } from '../../utils/metaPixel'
import './ContactSection.css'

const ContactSection = () => {
  const { t } = useTranslation()

  const handleWhatsAppClick = () => {
    trackContactClick('whatsapp')
  }

  const handleEmailClick = () => {
    trackContactClick('email')
  }

  return (
    <SectionWrapper id="kontakt" className="contact" ariaLabelledby="contact-title">
      <div className="contact-inner">
        <h2 id="contact-title">{t('contact.title')}</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon phone" aria-hidden="true">
              📞
            </div>
            <a className="pill whatsapp" href="https://wa.me/48512253179" target="_blank" rel="noreferrer" onClick={handleWhatsAppClick}>
              <img src={whatsappLogo} alt="" aria-hidden="true" className="pill-icon-img" />
              <div className="pill-text">
                <span className="pill-sub">Joanna Adamek</span>
                <strong>{t('contact.whatsapp')}</strong>
              </div>
              <span className="pill-badge">{t('common.online')}</span>
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon mail" aria-hidden="true">
              ✉️
            </div>
            <a className="pill email" href="mailto:kontakt@joannaadamek.edu.pl" onClick={handleEmailClick}>
              <strong>{t('contact.email')}</strong>
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default ContactSection
