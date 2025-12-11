export type QuestionOption = {
  value: string
  label: string
}

export type Question = {
  id: number
  prompt: string
  options: QuestionOption[]
  correct: string
  section?: string
  sectionIntro?: string
}

export type QuestionGroup = {
  title?: string
  questions: Question[]
}

export type EmailStatus = {
  sending: boolean
  sent: boolean
  error: string | null
}
