import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'
import { Dynable } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <Dynable
        columns={[
          {
            id: 'username',
            label: 'Username',
          },
          {
            id: 'email',
            label: 'Email',
          },
          {
            id: 'password',
            label: 'Password',
          },
          {
            id: 'age',
            label: 'Age',
          },
        ]}
        data={[
          {
            username: 'Vin Samdy',
            email: 'test@gmail.com',
            password: '1234567890',
            age: 18,
          },
        ]}
      />,
    )
  })
})
