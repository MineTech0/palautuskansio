import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(function (a, b) {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    }
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const LogOut = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const BlogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={LogOut}>Log out</button></p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm setNotification={setNotification} setBlogs={setBlogs} blogs={blogs} blogFormRef={blogFormRef} />
      </Togglable>
      <div id='blogList'>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} setNotification={setNotification} setBlogs={setBlogs} blogs={blogs}  />
        )}

      </div>
    </div>
  )
  const LoggedIn = () => (
    <>
      <h2>Log in to application</h2>
      <LoginForm setUser={setUser} setNotification={setNotification} />
    </>
  )


  return (
    <div>
      <Notification notification={notification} setNotification={setNotification} />

      {user === null
        ? LoggedIn()
        : BlogList()
      }

    </div>
  )
}

export default App