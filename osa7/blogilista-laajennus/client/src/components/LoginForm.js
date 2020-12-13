import React, { useState } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logIn } from '../redusers/authReducer'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logIn(username, password))
    setUsername('')
    setPassword('')
    history.push('/')
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group as={Row} controlId="Username">
        <Form.Label column sm={2}>
          Username
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="Password">
        <Form.Label column sm={2}>
          Password
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Login</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}
export default LoginForm
