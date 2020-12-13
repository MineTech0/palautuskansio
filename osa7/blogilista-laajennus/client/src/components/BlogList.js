import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import BlogForm from './BlogForm'
import Togglable from './Togglable'

export default function BlogList() {
  const blogs = useSelector((state) => state.blogs)
  if (!blogs) {
    return null
  }
  const blogFormRef = React.createRef()
  return (
    <div>
      <h2>Blogs</h2>
      <ListGroup className="mt-4">
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className='mt-4'>
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>
    </div>
  )
}
