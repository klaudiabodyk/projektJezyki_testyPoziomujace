import type { EmailStatus } from './types'

type ResultPanelProps = {
  submitted: boolean
  score: number | null
  total: number
  percent: number | null
  level?: string | null
  unanswered: number
  whatsappShareUrl: string
  emailStatus: EmailStatus
  whatsappIcon: string
}

const ResultPanel = ({
  submitted,
  score,
  total,
  percent,
  level,
  unanswered,
  whatsappShareUrl,
  emailStatus,
  whatsappIcon,
}: ResultPanelProps) => (
  <div className="result-panel" aria-live="polite">
    {submitted ? (
      <>
        <p className="result-title">Twój wynik</p>
        <p className="result-score">
          {score}/{total} poprawnych{percent !== null ? ` (${percent}%)` : ''}
        </p>
        {level ? (
          <p className="result-level">
            Twój poziom: <strong>{level}</strong>
            {score !== null && score === total ? ' 🎉' : ''}
          </p>
        ) : null}
        {unanswered > 0 ? (
          <p className="warning">
            Uwaga: {unanswered} {unanswered === 1 ? 'pytanie' : 'pytania'} pozostało bez odpowiedzi.
          </p>
        ) : null}
        <div className="email-status">
          {emailStatus.sending && <p>Wysyłam wynik na kontakt@joannaadamek.edu.pl…</p>}
          {emailStatus.sent && <p className="success">E-mail z wynikiem został wysłany w tle.</p>}
          {emailStatus.error ? <p className="email-error">{emailStatus.error}</p> : null}
        </div>
        <div className="whatsapp-card">
          <div>
            <p className="whatsapp-title">Skontaktuj się na WhatsApp</p>
            <p className="whatsapp-copy">Wyślij swój wynik i zapytaj o dalsze kroki.</p>
          </div>
          <a className="whatsapp-button" href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <img src={whatsappIcon} alt="" aria-hidden="true" className="whatsapp-icon" />
            Podziel się wynikiem
          </a>
        </div>
      </>
    ) : (
      <p className="muted">Wypełnij test i kliknij „Sprawdź wynik".</p>
    )}
  </div>
)

export default ResultPanel
