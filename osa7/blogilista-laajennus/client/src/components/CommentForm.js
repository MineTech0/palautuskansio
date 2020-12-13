import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../redusers/blogReducer'

export default function CommentForm({ id }) {
  const dispatch = useDispatch()
  const addComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(id, e.target.commentInput.value))
    e.target.commentInput.value = ''
  }

  return (
    <Form inline className="mt-4" onSubmit={addComment}>
      <Form.Label htmlFor="commentInput" srOnly>
        Comment
      </Form.Label>
      <Form.Control
        className="mb-2 mr-sm-2"
        id="commentInput"
        placeholder="..."
      />
      <Button type="submit" className="mb-2">
        Add comment
      </Button>
    </Form>
  )
}
