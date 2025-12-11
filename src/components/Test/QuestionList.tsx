import type { Question, QuestionGroup } from './types'

type QuestionListProps = {
  testId: string
  questions: Question[]
  groups?: QuestionGroup[]
  answers: Record<number, string>
  submitted: boolean
  canAnswer: boolean
  onChange: (id: number, value: string) => void
}

const QuestionCard = ({
  question,
  testId,
  answers,
  submitted,
  canAnswer,
  onChange,
}: {
  question: Question
  testId: string
  answers: Record<number, string>
  submitted: boolean
  canAnswer: boolean
  onChange: (id: number, value: string) => void
}) => {
  const checkedValue = answers[question.id]
  const isCorrect = submitted && checkedValue === question.correct
  const isIncorrect = submitted && checkedValue && checkedValue !== question.correct
  const cardClass = [
    'question-card',
    isCorrect ? 'correct' : '',
    isIncorrect ? 'incorrect' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={cardClass}>
      <div className="question-text">
        <span className="question-number">{question.id}.</span>
        <p>{question.prompt}</p>
      </div>
      <div className="options-grid">
        {question.options.map((option) => {
          const inputId = `q-${testId}-${question.id}-${option.value}`
          const checked = checkedValue === option.value
          return (
            <label
              key={option.value}
              className={`option ${checked ? 'checked' : ''} ${!canAnswer ? 'disabled' : ''}`}
              htmlFor={inputId}
            >
              <input
                type="radio"
                id={inputId}
                name={`question-${testId}-${question.id}`}
                value={option.value}
                checked={checked}
                disabled={!canAnswer}
                onChange={() => onChange(question.id, option.value)}
              />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

const QuestionList = ({ testId, questions, groups, answers, submitted, canAnswer, onChange }: QuestionListProps) => {
  if (groups?.length) {
    return (
      <>
        {groups.map((group) => {
          const groupKey = group.title ?? `group-${group.questions[0]?.id ?? '0'}`
          return (
            <fieldset key={groupKey} className="question-section">
              {group.title ? <legend className="section-title">{group.title}</legend> : null}
              <div className="question-list">
                {group.questions.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    testId={testId}
                    answers={answers}
                    submitted={submitted}
                    canAnswer={canAnswer}
                    onChange={onChange}
                  />
                ))}
              </div>
            </fieldset>
          )
        })}
      </>
    )
  }

  return (
    <div className="question-list">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          testId={testId}
          answers={answers}
          submitted={submitted}
          canAnswer={canAnswer}
          onChange={onChange}
        />
      ))}
    </div>
  )
}

export default QuestionList
