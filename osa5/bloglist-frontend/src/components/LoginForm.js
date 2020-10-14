import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        error: true,
        message: 'wrong password or username'
      })
    }
  }

  return (
    <form id='loginForm' onSubmit={handleLogin}>
      <div>
                username
        <input
          type="text"
          value={username}
          name="Username"
          id="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          name="Password"
          id="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginBtn' type="submit">login</button>
    </form>
  )
}
export default LoginForm