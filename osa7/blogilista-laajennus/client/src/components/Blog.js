import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { likeBlog, removeBlog } from '../redusers/blogReducer'
import { Button } from 'react-bootstrap'
import Comments from './Comments'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs?.find((b) => b.id === id))
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }
  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(removeBlog(blog))
      history.push('/')
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>{blog.url}</p>
      <p>
        {blog.likes}{' '}
        <Button size="sm" onClick={handleLike}>
          Like
        </Button>
      </p>
      <p>added by {blog.author}</p>
      {blog.user?.username === user.username ? (
        <Button variant="danger" onClick={handleRemove}>
          Remove
        </Button>
      ) : null}
      <Comments blog={blog}/>
    </div>
  )
}

export default Blog
