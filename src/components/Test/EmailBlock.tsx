type EmailBlockProps = {
  inputId: string
  value: string
  onChange: (value: string) => void
  error: string | null
  helper?: string
}

const EmailBlock = ({ inputId, value, onChange, error, helper }: EmailBlockProps) => (
  <div className="email-block">
    <label className="email-label" htmlFor={inputId}>
      Podaj swój e-mail, aby rozpocząć test
    </label>
    <input
      id={inputId}
      name="email"
      type="email"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required
      placeholder="np. imie.nazwisko@email.com"
    />
    {helper ? <p className="email-helper">{helper}</p> : null}
    {error ? <p className="email-error">{error}</p> : null}
  </div>
)

export default EmailBlock
