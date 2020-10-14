
import React, { useState } from 'react'
import blogService from '../services/blogs'

export default function BlogForm({ setNotification, setBlogs, blogs, blogFormRef }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url
      })
      setTitle('')
      setUrl('')
      setAuthor('')
      setNotification({
        error: false,
        message: `a new blog ${blog.title} by ${blog.author} added`
      })
      setBlogs(blogs.concat(blog))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setNotification({
        error: true,
        message: exception.message
      })
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>Title:
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)} /></div>
        <div>Author:
          <input type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          /></div>
        <div>Url: <input type="text"
          value={url}
          name="Url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        /></div>
        <button id='addBtn' type='submit' >Add new</button>
      </form>
    </div>
  )
}
