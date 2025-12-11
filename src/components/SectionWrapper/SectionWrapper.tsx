import type { CSSProperties, ReactNode } from 'react'
import './SectionWrapper.css'

type SectionWrapperProps = {
  children: ReactNode
  id?: string
  className?: string
  ariaLabelledby?: string
  style?: CSSProperties
}

const SectionWrapper = ({
  children,
  id,
  className,
  ariaLabelledby,
  style,
}: SectionWrapperProps) => {
  const classes = ['section-wrapper', className].filter(Boolean).join(' ')

  return (
    <section id={id} className={classes} aria-labelledby={ariaLabelledby} style={style}>
      {children}
    </section>
  )
}

export default SectionWrapper
