import React, { useEffect } from 'react'
import './App.css'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initBlogs } from './redusers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import { initUser } from './redusers/authReducer'
import { initUsers } from './redusers/userReducer'
import Menu from './components/Menu'
import Blog from './components/Blog'
import { Container } from 'react-bootstrap'
import UsersPage from './components/UsersPage'
import UserPage from './components/UserPage'

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  if (!user) {
    return <LoginPage />
  }

  return (
    <>
      <Menu />
      <Container>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/users/:id">
            <UserPage />
          </Route>
          <Route path="/users">
            <UsersPage />
          </Route>
          <Route path="/">
            <BlogList />
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
