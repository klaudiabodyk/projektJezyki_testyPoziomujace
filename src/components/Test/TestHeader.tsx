import type { ReactNode } from 'react'

type TestHeaderProps = {
  eyebrow: string
  title: string
  meta?: string
  headingId: string
  metaBoxTitle: string
  metaBoxContent: ReactNode
  metaBoxSecondary?: ReactNode
}

const TestHeader = ({
  eyebrow,
  title,
  meta,
  headingId,
  metaBoxTitle,
  metaBoxContent,
  metaBoxSecondary,
}: TestHeaderProps) => (
  <div className="test-header">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={headingId}>{title}</h2>
      {meta ? <p className="meta">{meta}</p> : null}
    </div>
    <div className="meta-box">
      <strong>{metaBoxTitle}</strong>
      {metaBoxContent}
      {metaBoxSecondary ? <p className="secondary">{metaBoxSecondary}</p> : null}
    </div>
  </div>
)

export default TestHeader
