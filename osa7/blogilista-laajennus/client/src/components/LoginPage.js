import React from 'react'
import Notification from './Notification'
import LoginForm from './LoginForm'
import { Container } from 'react-bootstrap'

export default function LoginPage() {
  return (
    <Container className='mt-4'>
      <Notification/>
      <h2>Log in to application</h2>
      <LoginForm />
    </Container>
  )
}
