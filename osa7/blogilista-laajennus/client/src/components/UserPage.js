/* eslint-disable no-unused-vars */
import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

export default function UserPage() {
  const id = useParams().id
  const user = useSelector((state) =>
    state.users?.find((user) => user.id === id)
  )

  if (!user) {
    return null
  }
  return (
    <>
      <h1>{user.name}</h1>
      <hr />
      <h3>Added blogs:</h3>
      <ListGroup>
        {user.blogs.map((b) => (
          <ListGroup.Item key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}
