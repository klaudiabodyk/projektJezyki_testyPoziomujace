import type { FormEvent, ReactNode } from 'react'
import SectionWrapper from '../SectionWrapper/SectionWrapper'
import EmailBlock from './EmailBlock'
import QuestionList from './QuestionList'
import ResultPanel from './ResultPanel'
import TestHeader from './TestHeader'
import type { EmailStatus, Question, QuestionGroup } from './types'

type TestFormProps = {
  wrapperId: string
  wrapperClassName: string
  headingId: string
  backLabel: string
  onBack: () => void
  header: {
    eyebrow: string
    title: string
    meta?: string
    metaBoxTitle: string
    metaBoxContent: ReactNode
    metaBoxSecondary?: ReactNode
  }
  email: string
  emailError: string | null
  onEmailChange: (value: string) => void
  canStart: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onReset: () => void
  questions: Question[]
  groups?: QuestionGroup[]
  answers: Record<number, string>
  onAnswerChange: (id: number, value: string) => void
  submitted: boolean
  score: number | null
  percent: number | null
  level?: string | null
  unanswered: number
  emailStatus: EmailStatus
  whatsappShareUrl: string
  whatsappIcon: string
  postResultCtaHref: string
  helperText?: string
  testId: string
}

const TestForm = ({
  wrapperId,
  wrapperClassName,
  headingId,
  backLabel,
  onBack,
  header,
  email,
  emailError,
  onEmailChange,
  canStart,
  onSubmit,
  onReset,
  questions,
  groups,
  answers,
  onAnswerChange,
  submitted,
  score,
  percent,
  level,
  unanswered,
  emailStatus,
  whatsappShareUrl,
  whatsappIcon,
  postResultCtaHref,
  helperText,
  testId,
}: TestFormProps) => (
  <SectionWrapper id={wrapperId} className={wrapperClassName} ariaLabelledby={headingId}>
    <button type="button" className="back-button" onClick={onBack}>
      {backLabel}
    </button>

    <TestHeader {...header} headingId={headingId} />

    <form className="test-form" onSubmit={onSubmit}>
      <EmailBlock inputId={`${testId}-email`} value={email} onChange={onEmailChange} error={emailError} helper={helperText} />
      <QuestionList
        testId={testId}
        questions={questions}
        groups={groups}
        answers={answers}
        submitted={submitted}
        canAnswer={canStart}
        onChange={onAnswerChange}
      />
      <div className="form-actions">
        <button type="submit" className="primary-link" disabled={!canStart}>
          Sprawdź wynik
        </button>
        <button type="button" className="ghost-button" onClick={onReset} disabled={!canStart}>
          Wyczyść odpowiedzi
        </button>
      </div>
    </form>

    <ResultPanel
      submitted={submitted}
      score={score}
      total={questions.length}
      percent={percent}
      level={level}
      unanswered={unanswered}
      whatsappShareUrl={whatsappShareUrl}
      emailStatus={emailStatus}
      whatsappIcon={whatsappIcon}
    />

    <div className="post-result-actions">
      <a className="offer-button" href={postResultCtaHref} target="_blank" rel="noopener noreferrer">
        Zobacz ofertę naszych kursów grupowych
      </a>
    </div>
  </SectionWrapper>
)

export default TestForm
