import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from './Login'

describe('form fields', () => {
  it('update correctly on user input', () => {
    render(<Login/>)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    userEvent.type(emailInput, 'hello')
    userEvent.type(passwordInput, 'world!')

    expect(emailInput).toHaveValue('hello')
    expect(passwordInput).toHaveValue('world!')
  })
})
