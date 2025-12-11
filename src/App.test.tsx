import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('renders the initial count', () => {
    render(<App />)
    expect(screen.getByText('count is 0')).toBeInTheDocument()
  })

  it('increments count when button is clicked', () => {
    render(<App />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(screen.getByText('count is 1')).toBeInTheDocument()
  })

  it('renders logos', () => {
    render(<App />)
    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')
    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })
})
