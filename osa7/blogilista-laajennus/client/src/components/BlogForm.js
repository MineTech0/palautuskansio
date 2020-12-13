import React, { useState } from 'react'
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createBlog } from '../redusers/blogReducer'

export default function BlogForm({ blogFormRef }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(
      createBlog({
        title,
        url,
        author,
      })
    )
    setTitle('')
    setUrl('')
    setAuthor('')
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <Card>
        <Card.Header as="h5">Create new</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="title">
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={title}
                  name="title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="author">
              <Form.Label column sm={2}>
                Author
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={author}
                  name="author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="url">
              <Form.Label column sm={2}>
                Url
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={url}
                  name="Url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Add new</Button>
                <Button
                  className="ml-2"
                  onClick={() => blogFormRef.current.toggleVisibility()}
                >
                  Cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
