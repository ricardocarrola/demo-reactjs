import { render, screen } from '@testing-library/react'
import App from './App'
import React from "react";

test('renders sign in page', () => {
  render(<App />)
  const linkElement = screen.getByText(/Sign in/i)
  expect(linkElement).toBeInTheDocument()
})
