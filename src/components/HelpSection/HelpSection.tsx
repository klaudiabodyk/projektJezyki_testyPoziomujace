import SectionWrapper from '../SectionWrapper/SectionWrapper'
import './HelpSection.css'

const HelpSection = () => {
  return (
    <SectionWrapper id="help" className="help" ariaLabelledby="help-title">
      <div className="help-inner">
        <h2 id="help-title">
          Pomożemy Ci określić Twój <span>poziom</span>
        </h2>
        <p className="lead">
          Wiele osób nie wie, od jakiego poziomu zacząć – <strong>i to całkowicie normalne!</strong> Dlatego
          przygotowaliśmy dwa wygodne sposoby, które pomogą Ci dobrać odpowiednią grupę:
        </p>
        <ul className="help-list">
          <li>
            <div className="dot" aria-hidden="true" />
            <div>
              <p className="help-title">Test poziomujący</p>
              <p>
                Wybierz do góry język, który Cię interesuje, a następnie poziom, który chcesz sprawdzić – po
                wypełnieniu testu wspólnie omówimy wynik. Jeśli nie wiesz, od czego zacząć – napisz do nas!
                Podpowiemy.
              </p>
            </div>
          </li>
          <li>
            <div className="dot" aria-hidden="true" />
            <div>
              <p className="help-title">Bezpłatny audyt językowy</p>
              <p>
                Jeśli wolisz porozmawiać – zrobimy krótki audyt (telefonicznie lub przez wiadomości głosowe na
                WhatsApp). Zadamy Ci kilka pytań i na tej podstawie zaproponujemy odpowiedni poziom.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </SectionWrapper>
  )
}

export default HelpSection
