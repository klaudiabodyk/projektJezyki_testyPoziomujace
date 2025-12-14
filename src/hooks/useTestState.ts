import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import type { Question } from '../components/Test/types'
import { validateEmail } from '../utils/validation'
import { sendResultsEmail } from '../utils/sendResults'
import { trackTestCompletion } from '../utils/metaPixel'

type ShareConfig = {
  buildMessage: (score: number, total: number, percent: number | null, level: string, missing: number, userEmail: string) => string
  baseUrl: string
  fallbackUrl: string
}

type UseTestStateProps = {
  questions: Question[]
  resolveLevel: (score: number) => string
  languageLabel: string
  shareConfig: ShareConfig
  testLabel: string
  testUrl: string
}

export const useTestState = ({
  questions,
  resolveLevel,
  languageLabel,
  shareConfig,
  testLabel,
  testUrl,
}: UseTestStateProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [score, setScore] = useState<number | null>(null)
  const [unanswered, setUnanswered] = useState<number>(questions.length)
  const [submitted, setSubmitted] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailSendError, setEmailSendError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)

  const canStart = useMemo(() => validateEmail(email), [email])
  const percent = useMemo(() => {
    if (score === null) return null
    return Math.round((score / questions.length) * 100)
  }, [score, questions.length])
  const level = useMemo(() => {
    if (score === null) return null
    return resolveLevel(score)
  }, [resolveLevel, score])

  const whatsappShareUrl = useMemo(() => {
    if (score === null || level === null) return shareConfig.fallbackUrl
    const message = shareConfig.buildMessage(score, questions.length, percent, level, unanswered, email)
    return `${shareConfig.baseUrl}${encodeURIComponent(message)}`
  }, [level, percent, score, shareConfig, questions.length, unanswered, email])

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError && validateEmail(value)) {
      setEmailError(null)
    }
  }

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let correct = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correct) {
        correct += 1
      }
    })
    const emailIsValid = validateEmail(email)
    if (!emailIsValid) {
      setEmailError('Podaj poprawny adres e-mail, aby rozpocząć test.')
      setSubmitted(false)
      return
    }
    setEmailError(null)
    const missing = questions.filter((q) => !answers[q.id]).length
    setUnanswered(missing)
    setScore(correct)
    setSubmitted(true)
    setEmailSent(false)
    setEmailSendError(null)
    setEmailSending(true)
    
    // Calculate level immediately for email
    const calculatedLevel = resolveLevel(correct)
    const finalPercent = Math.round((correct / questions.length) * 100)
    
    // Prepare WhatsApp URL before try block
    const message = shareConfig.buildMessage(correct, questions.length, finalPercent, calculatedLevel, missing, email)
    const whatsappUrl = `${shareConfig.baseUrl}${encodeURIComponent(message)}`
    
    try {
      await sendResultsEmail(
        correct,
        missing,
        email,
        questions.length,
        calculatedLevel,
        languageLabel,
        testLabel,
        testUrl,
      )
      setEmailSent(true)
      // Track test completion
      trackTestCompletion(calculatedLevel, finalPercent, languageLabel)
    } catch (error) {
      setEmailSendError(
        error instanceof Error ? error.message : 'Nie udało się wysłać e-maila. Spróbuj ponownie później.',
      )
    } finally {
      setEmailSending(false)
      // Open WhatsApp regardless of email result
      window.open(whatsappUrl, '_blank')
    }
  }

  const handleReset = () => {
    setAnswers({})
    setScore(null)
    setUnanswered(questions.length)
    setSubmitted(false)
    setEmailSent(false)
    setEmailSendError(null)
  }

  return {
    answers,
    score,
    percent,
    level,
    unanswered,
    submitted,
    email,
    emailError,
    emailStatus: { sending: emailSending, sent: emailSent, error: emailSendError },
    canStart,
    whatsappShareUrl,
    handleChange,
    handleSubmit,
    handleReset,
    handleEmailChange,
  }
}
