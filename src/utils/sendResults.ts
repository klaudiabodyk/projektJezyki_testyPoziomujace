type SendResultsPayload = {
  correct: number
  total: number
  missing: number
  percent: number
  userEmail: string
  level: string
  language?: string
  testLabel?: string
  testUrl?: string
}

export async function sendResultsEmail(
  correct: number,
  missing: number,
  userEmail: string,
  totalQuestions: number,
  level: string,
  language?: string,
  testLabel?: string,
  testUrl?: string,
) {
  const apiBase = import.meta.env.VITE_API_BASE_URL ?? ''
  const percent = Math.round((correct / totalQuestions) * 100)

  const payload: SendResultsPayload = {
    correct,
    total: totalQuestions,
    missing,
    percent,
    userEmail,
    level,
  }

  if (language) {
    payload.language = language
  }

  if (testLabel) {
    payload.testLabel = testLabel
  }

  if (testUrl) {
    payload.testUrl = testUrl
  }

  const response = await fetch(`${apiBase}/api/send-result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Błąd wysyłania e-maila.')
  }
}
