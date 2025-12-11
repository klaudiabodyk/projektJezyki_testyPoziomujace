import logo from '../../assets/logo.png'
import './TopNav.css'

const TopNav = () => {
  return (
    <header className="top-nav">
      <div className="brand">
        <img src={logo} alt="Projekt: Języki! Joanna Adamek" />
      </div>
      <nav className="nav-links" aria-label="Główna nawigacja">
        <a href="https://joannaadamek.com.pl/o-nas/">O NAS</a>

        <div className="nav-dropdown">
          <a className="dropdown-trigger" href="https://joannaadamek.com.pl/semestralne/">
            OFERTA
          </a>
          <div className="dropdown-menu" role="menu">
            <a href="https://joannaadamek.com.pl/oferta-wakacyjna/">Oferta wakacyjna</a>
            <a href="https://joannaadamek.com.pl/semestralne/">Kursy grupowe</a>
            <a href="https://joannaadamek.com.pl/webinary/">Webinary</a>
            <a href="https://joannaadamek.com.pl/kurs-indywidualny/">Kurs indywidualny</a>
          </div>
        </div>

        
        <a className="cta" href="https://joannaadamek.com.pl/zapisz-sie/">
          ZAPISZ SIĘ!
        </a>
        <a href="https://joannaadamek.com.pl/kontakt/">KONTAKT</a>
        <a href="https://joannaadamek.com.pl/sklep/">SKLEP</a>
        <a href="https://joannaadamek.com.pl/kokpit/">MOJE KONTO</a>
      </nav>
    </header>
  )
}

export default TopNav
