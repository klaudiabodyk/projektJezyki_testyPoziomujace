import { useState, useEffect } from 'react'
import logo from '../../assets/logo.png'
import './TopNav.css'

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Close menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false)
        setIsDropdownOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isMenuOpen) {
      setIsDropdownOpen(false)
    }
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDropdownOpen(!isDropdownOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsDropdownOpen(false)
  }

  return (
    <header className="top-nav">
      <div className="nav-header">
        <div className="brand">
          <img src={logo} alt="Projekt: Języki! Joanna Adamek" />
        </div>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div 
        className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      <nav 
        className={`nav-links ${isMenuOpen ? 'active' : ''}`} 
        aria-label="Główna nawigacja"
      >
        <a href="https://joannaadamek.com.pl/o-nas/" onClick={closeMenu}>O NAS</a>

        <div className={`nav-dropdown ${isDropdownOpen ? 'active' : ''}`}>
          <button 
            className="dropdown-trigger"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            OFERTA
            <svg 
              className="dropdown-arrow" 
              width="12" 
              height="12" 
              viewBox="0 0 12 12"
              aria-hidden="true"
            >
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-menu-inner">
              <a href="https://joannaadamek.com.pl/oferta-wakacyjna/" onClick={closeMenu}>Oferta wakacyjna</a>
              <a href="https://joannaadamek.com.pl/semestralne/" onClick={closeMenu}>Kursy grupowe</a>
              <a href="https://joannaadamek.com.pl/webinary/" onClick={closeMenu}>Webinary</a>
              <a href="https://joannaadamek.com.pl/kurs-indywidualny/" onClick={closeMenu}>Kurs indywidualny</a>
            </div>
          </div>
        </div>

        <a className="cta" href="https://joannaadamek.com.pl/zapisz-sie/" onClick={closeMenu}>
          ZAPISZ SIĘ!
        </a>
        <a href="https://joannaadamek.com.pl/kontakt/" onClick={closeMenu}>KONTAKT</a>
        <a href="https://joannaadamek.com.pl/sklep/" onClick={closeMenu}>SKLEP</a>
        <a href="https://joannaadamek.com.pl/kokpit/" onClick={closeMenu}>MOJE KONTO</a>
      </nav>
    </header>
  )
}

export default TopNav
