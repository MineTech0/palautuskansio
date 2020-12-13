import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import CommentForm from './CommentForm'

export default function Comments({ blog }) {
  return (
    <>
      <CommentForm id={blog.id} />
      <Card>
        <Card.Header>Comments</Card.Header>
        <ListGroup variant="flush">
          {blog.comments.map((comment, i) => (
            <ListGroup.Item key={i}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </>
  )
}
